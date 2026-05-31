import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Package, ArrowDownCircle, ArrowUpCircle, AlertTriangle, Download, Trash2, Pencil, Save, X, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "estoque_hospital_v1";

const unidades = ["kg", "g", "un", "cx", "pct", "lt", "ml", "fardo", "saco"];
const categorias = ["Alimentos", "Limpeza", "Descartáveis", "Copa", "Hortifruti", "Carnes", "Laticínios", "Outros"];

const produtosIniciais = [
  { id: crypto.randomUUID(), nome: "Açúcar", categoria: "Alimentos", unidade: "kg", estoque: 14, minimo: 10, validade: "", local: "Despensa" },
  { id: crypto.randomUUID(), nome: "Arroz branco", categoria: "Alimentos", unidade: "kg", estoque: 25, minimo: 20, validade: "", local: "Despensa" },
  { id: crypto.randomUUID(), nome: "Sal", categoria: "Alimentos", unidade: "kg", estoque: 3, minimo: 4, validade: "", local: "Despensa" },
  { id: crypto.randomUUID(), nome: "Fermento", categoria: "Alimentos", unidade: "un", estoque: 2, minimo: 3, validade: "", local: "Despensa" },
];

function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function baixarCSV(produtos, movimentos) {
  const linhasProdutos = [
    ["PRODUTOS"],
    ["Nome", "Categoria", "Unidade", "Estoque", "Mínimo", "Validade", "Local"],
    ...produtos.map((p) => [p.nome, p.categoria, p.unidade, p.estoque, p.minimo, p.validade || "", p.local || ""]),
    [],
    ["MOVIMENTAÇÕES"],
    ["Data", "Tipo", "Produto", "Quantidade", "Responsável", "Observação"],
    ...movimentos.map((m) => [m.data, m.tipo, m.produtoNome, m.quantidade, m.responsavel || "", m.obs || ""]),
  ];

  const csv = linhasProdutos
    .map((linha) => linha.map((campo) => `"${String(campo).replaceAll('"', '""')}"`).join(";"))
    .join("\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "controle-estoque-hospital.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function SistemaEstoqueHospital() {
  const [produtos, setProdutos] = useState([]);
  const [movimentos, setMovimentos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [aba, setAba] = useState("dashboard");
  const [editando, setEditando] = useState(null);
  const [produtoForm, setProdutoForm] = useState({
    nome: "",
    categoria: "Alimentos",
    unidade: "kg",
    estoque: "",
    minimo: "",
    validade: "",
    local: "",
  });
  const [movForm, setMovForm] = useState({
    produtoId: "",
    tipo: "entrada",
    quantidade: "",
    responsavel: "",
    obs: "",
  });

  useEffect(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
      const dados = JSON.parse(salvo);
      setProdutos(dados.produtos || []);
      setMovimentos(dados.movimentos || []);
    } else {
      setProdutos(produtosIniciais);
      setMovimentos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ produtos, movimentos }));
  }, [produtos, movimentos]);

  const produtosFiltrados = useMemo(() => {
    return produtos
      .filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
      .filter((p) => filtroCategoria === "Todos" || p.categoria === filtroCategoria)
      .sort((a, b) => a.nome.localeCompare(b.nome));
  }, [produtos, busca, filtroCategoria]);

  const resumo = useMemo(() => {
    const baixo = produtos.filter((p) => Number(p.estoque) <= Number(p.minimo));
    const entradas = movimentos.filter((m) => m.tipo === "entrada").length;
    const saidas = movimentos.filter((m) => m.tipo === "saida").length;
    return { total: produtos.length, baixo: baixo.length, entradas, saidas };
  }, [produtos, movimentos]);

  function limparFormProduto() {
    setProdutoForm({ nome: "", categoria: "Alimentos", unidade: "kg", estoque: "", minimo: "", validade: "", local: "" });
    setEditando(null);
  }

  function salvarProduto(e) {
    e.preventDefault();
    if (!produtoForm.nome.trim()) return alert("Informe o nome do produto.");

    const dados = {
      ...produtoForm,
      nome: produtoForm.nome.trim(),
      estoque: Number(produtoForm.estoque || 0),
      minimo: Number(produtoForm.minimo || 0),
    };

    if (editando) {
      setProdutos((atual) => atual.map((p) => (p.id === editando ? { ...p, ...dados } : p)));
    } else {
      setProdutos((atual) => [...atual, { id: crypto.randomUUID(), ...dados }]);
    }
    limparFormProduto();
  }

  function editarProduto(produto) {
    setEditando(produto.id);
    setProdutoForm({
      nome: produto.nome,
      categoria: produto.categoria,
      unidade: produto.unidade,
      estoque: String(produto.estoque),
      minimo: String(produto.minimo),
      validade: produto.validade || "",
      local: produto.local || "",
    });
    setAba("produtos");
  }

  function excluirProduto(id) {
    if (!confirm("Deseja excluir este produto?")) return;
    setProdutos((atual) => atual.filter((p) => p.id !== id));
  }

  function registrarMovimento(e) {
    e.preventDefault();
    const produto = produtos.find((p) => p.id === movForm.produtoId);
    const qtd = Number(movForm.quantidade || 0);
    if (!produto) return alert("Selecione um produto.");
    if (qtd <= 0) return alert("Informe uma quantidade válida.");
    if (movForm.tipo === "saida" && qtd > Number(produto.estoque)) return alert("Saída maior que o estoque disponível.");

    setProdutos((atual) =>
      atual.map((p) =>
        p.id === produto.id
          ? { ...p, estoque: movForm.tipo === "entrada" ? Number(p.estoque) + qtd : Number(p.estoque) - qtd }
          : p
      )
    );

    setMovimentos((atual) => [
      {
        id: crypto.randomUUID(),
        data: formatDate(),
        tipo: movForm.tipo,
        produtoId: produto.id,
        produtoNome: produto.nome,
        quantidade: qtd,
        responsavel: movForm.responsavel,
        obs: movForm.obs,
      },
      ...atual,
    ]);

    setMovForm({ produtoId: "", tipo: "entrada", quantidade: "", responsavel: "", obs: "" });
  }

  const cards = [
    { titulo: "Produtos cadastrados", valor: resumo.total, icon: Package },
    { titulo: "Estoque baixo", valor: resumo.baixo, icon: AlertTriangle },
    { titulo: "Entradas", valor: resumo.entradas, icon: ArrowDownCircle },
    { titulo: "Saídas", valor: resumo.saidas, icon: ArrowUpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">Sistema online sem domínio</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Controle de Estoque Hospitalar</h1>
            <p className="mt-1 text-slate-600">Cadastro, entrada, saída, alerta de estoque baixo e relatório para exportar.</p>
          </div>
          <Button onClick={() => baixarCSV(produtos, movimentos)} className="gap-2 rounded-2xl">
            <Download size={18} /> Exportar CSV
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            ["dashboard", "Dashboard"],
            ["produtos", "Produtos"],
            ["movimentos", "Entrada/Saída"],
            ["relatorio", "Relatório"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setAba(key)}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${aba === key ? "bg-slate-900 text-white shadow" : "bg-white text-slate-700 hover:bg-slate-100"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {aba === "dashboard" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <Card key={card.titulo} className="rounded-3xl border-0 shadow-sm">
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <p className="text-sm text-slate-500">{card.titulo}</p>
                        <p className="mt-1 text-3xl font-bold">{card.valor}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-100 p-3">
                        <Icon size={24} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BarChart3 size={20} />
                  <h2 className="text-xl font-bold">Produtos com estoque baixo</h2>
                </div>
                <TabelaProdutos produtos={produtos.filter((p) => Number(p.estoque) <= Number(p.minimo))} editarProduto={editarProduto} excluirProduto={excluirProduto} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {aba === "produtos" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[390px_1fr]">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-5">
                <h2 className="mb-4 text-xl font-bold">{editando ? "Editar produto" : "Cadastrar produto"}</h2>
                <form onSubmit={salvarProduto} className="space-y-3">
                  <Input label="Nome do produto" value={produtoForm.nome} onChange={(v) => setProdutoForm({ ...produtoForm, nome: v })} placeholder="Ex: Arroz branco" />
                  <div className="grid grid-cols-2 gap-3">
                    <Select label="Categoria" value={produtoForm.categoria} onChange={(v) => setProdutoForm({ ...produtoForm, categoria: v })} options={categorias} />
                    <Select label="Unidade" value={produtoForm.unidade} onChange={(v) => setProdutoForm({ ...produtoForm, unidade: v })} options={unidades} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Estoque atual" type="number" value={produtoForm.estoque} onChange={(v) => setProdutoForm({ ...produtoForm, estoque: v })} />
                    <Input label="Estoque mínimo" type="number" value={produtoForm.minimo} onChange={(v) => setProdutoForm({ ...produtoForm, minimo: v })} />
                  </div>
                  <Input label="Validade" type="date" value={produtoForm.validade} onChange={(v) => setProdutoForm({ ...produtoForm, validade: v })} />
                  <Input label="Local de armazenamento" value={produtoForm.local} onChange={(v) => setProdutoForm({ ...produtoForm, local: v })} placeholder="Ex: Despensa" />
                  <div className="flex gap-2 pt-2">
                    <Button type="submit" className="w-full gap-2 rounded-2xl"><Save size={18} /> Salvar</Button>
                    {editando && <Button type="button" variant="outline" onClick={limparFormProduto} className="rounded-2xl"><X size={18} /></Button>}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="mb-4 flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input className="w-full rounded-2xl border bg-white py-2.5 pl-10 pr-3 outline-none focus:ring-2 focus:ring-slate-300" placeholder="Buscar produto..." value={busca} onChange={(e) => setBusca(e.target.value)} />
                  </div>
                  <select className="rounded-2xl border bg-white px-3 py-2.5 outline-none" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                    <option>Todos</option>
                    {categorias.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <TabelaProdutos produtos={produtosFiltrados} editarProduto={editarProduto} excluirProduto={excluirProduto} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {aba === "movimentos" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[390px_1fr]">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-5">
                <h2 className="mb-4 text-xl font-bold">Registrar entrada ou saída</h2>
                <form onSubmit={registrarMovimento} className="space-y-3">
                  <Select label="Produto" value={movForm.produtoId} onChange={(v) => setMovForm({ ...movForm, produtoId: v })} options={produtos.map((p) => ({ value: p.id, label: `${p.nome} — ${p.estoque} ${p.unidade}` }))} placeholder="Selecione" />
                  <Select label="Tipo" value={movForm.tipo} onChange={(v) => setMovForm({ ...movForm, tipo: v })} options={[{ value: "entrada", label: "Entrada" }, { value: "saida", label: "Saída" }]} />
                  <Input label="Quantidade" type="number" value={movForm.quantidade} onChange={(v) => setMovForm({ ...movForm, quantidade: v })} />
                  <Input label="Responsável" value={movForm.responsavel} onChange={(v) => setMovForm({ ...movForm, responsavel: v })} placeholder="Nome de quem registrou" />
                  <Input label="Observação" value={movForm.obs} onChange={(v) => setMovForm({ ...movForm, obs: v })} placeholder="Ex: usado no almoço" />
                  <Button type="submit" className="w-full gap-2 rounded-2xl"><Plus size={18} /> Registrar</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-5">
                <h2 className="mb-4 text-xl font-bold">Últimas movimentações</h2>
                <TabelaMovimentos movimentos={movimentos} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {aba === "relatorio" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Relatório geral</h2>
                    <p className="text-slate-600">Lista completa para conferência e pedido de reposição.</p>
                  </div>
                  <Button onClick={() => baixarCSV(produtos, movimentos)} className="gap-2 rounded-2xl"><Download size={18} /> Baixar relatório</Button>
                </div>
                <TabelaProdutos produtos={produtosFiltrados} editarProduto={editarProduto} excluirProduto={excluirProduto} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-slate-300" />
    </label>
  );
}

function Select({ label, value, onChange, options, placeholder }) {
  const normalizadas = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-slate-300">
        {placeholder && <option value="">{placeholder}</option>}
        {normalizadas.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

function TabelaProdutos({ produtos, editarProduto, excluirProduto }) {
  if (!produtos.length) return <div className="rounded-2xl bg-slate-100 p-5 text-center text-slate-500">Nenhum produto encontrado.</div>;
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3">Produto</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Estoque</th>
              <th className="p-3">Mínimo</th>
              <th className="p-3">Local</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => {
              const baixo = Number(p.estoque) <= Number(p.minimo);
              return (
                <tr key={p.id} className="border-t">
                  <td className="p-3 font-semibold">{p.nome}</td>
                  <td className="p-3">{p.categoria}</td>
                  <td className="p-3">{p.estoque} {p.unidade}</td>
                  <td className="p-3">{p.minimo} {p.unidade}</td>
                  <td className="p-3">{p.local || "-"}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${baixo ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>{baixo ? "Repor" : "Ok"}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => editarProduto(p)} className="rounded-xl bg-slate-100 p-2 hover:bg-slate-200"><Pencil size={16} /></button>
                      <button onClick={() => excluirProduto(p.id)} className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabelaMovimentos({ movimentos }) {
  if (!movimentos.length) return <div className="rounded-2xl bg-slate-100 p-5 text-center text-slate-500">Nenhuma movimentação registrada.</div>;
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3">Data</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Produto</th>
              <th className="p-3">Qtd.</th>
              <th className="p-3">Responsável</th>
              <th className="p-3">Obs.</th>
            </tr>
          </thead>
          <tbody>
            {movimentos.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-3">{m.data}</td>
                <td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-bold ${m.tipo === "entrada" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{m.tipo === "entrada" ? "Entrada" : "Saída"}</span></td>
                <td className="p-3 font-semibold">{m.produtoNome}</td>
                <td className="p-3">{m.quantidade}</td>
                <td className="p-3">{m.responsavel || "-"}</td>
                <td className="p-3">{m.obs || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
