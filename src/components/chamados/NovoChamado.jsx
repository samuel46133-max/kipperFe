import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TIPOS = ["Hidráulico", "Elétrico", "Ar-condicionado", "Mobiliário", "Limpeza", "Outro"];
const LOCAIS = ["Sala 1", "Sala 2", "Sala 40", "Refeitório", "Inspetoria", "Banheiro", "Corredor"];

const fieldClass =
  "w-full py-2.5 px-3 border border-line rounded-lg bg-white font-body text-sm text-ink-strong outline-none transition focus:border-primary-end focus:shadow-[0_0_0_3px_rgba(133,89,43,0.14)]";
const labelClass = "font-body text-xs font-medium text-ink-mid mb-1.5 block";

export default function NovoChamado({ onSubmit }) {
  const navigate = useNavigate();

    useEffect(() => {
    const veioDoDashboard = sessionStorage.getItem("navegacaoInterna");
    if (veioDoDashboard) {
        sessionStorage.removeItem("navegacaoInterna");
    } else {
        navigate("/home", { replace: true });
    }
    }, [navigate]);

  const [tipo, setTipo] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [patrimonio, setPatrimonio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ tipo, local, descricao, patrimonio, anexos: 0 });
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-full bg-paper">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-line">
        <h1 className="font-heading text-lg font-bold text-ink-strong">Kipper</h1>
        <div className="flex items-center gap-4">
          <span className="font-body text-sm text-ink-mid">Ana Souza · Usuário comum</span>
          <button
            onClick={() => navigate("/login")}
            className="font-body text-sm text-ink-faint border-0 bg-transparent cursor-pointer hover:text-danger"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-ink-strong">Abrir novo chamado</h2>
          <button
            onClick={() => navigate("/home")}
            className="font-body text-sm text-ink-mid border border-line rounded-lg px-3 py-1.5 cursor-pointer bg-white hover:bg-paper"
          >
            ← Voltar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-line rounded-xl p-6">
          <p className="font-heading text-xs font-bold uppercase tracking-wide text-ink-faint mb-3">
            Dados do solicitante
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className={labelClass}>Nome do usuário</label>
              <input className={fieldClass} value="Ana Souza" readOnly />
            </div>
            <div>
              <label className={labelClass}>ID do usuário</label>
              <input className={fieldClass} value="1043" readOnly />
            </div>
          </div>

          <p className="font-heading text-xs font-bold uppercase tracking-wide text-ink-faint mb-3">
            Detalhes do problema
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Tipo de chamado</label>
              <select className={fieldClass} value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                <option value="">Selecione...</option>
                {TIPOS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Localização do problema</label>
              <select className={fieldClass} value={local} onChange={(e) => setLocal(e.target.value)} required>
                <option value="">Selecione...</option>
                {LOCAIS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Descrição do problema</label>
              <textarea
                className={`${fieldClass} min-h-[100px] resize-y`}
                placeholder="Descreva o problema com detalhes..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={labelClass}>
                Número de patrimônio <span className="text-ink-faint font-normal normal-case">(se envolver objeto patrimoniado)</span>
              </label>
              <input
                className={fieldClass}
                placeholder="Ex: 4821"
                value={patrimonio}
                onChange={(e) => setPatrimonio(e.target.value)}
              />
            </div>
          </div>

          <p className="font-heading text-xs font-bold uppercase tracking-wide text-ink-faint mb-3">
            Anexos <span className="font-normal normal-case text-ink-faint">(opcional)</span>
          </p>
          <div className="border-2 border-dashed border-line rounded-lg p-6 text-center font-body text-sm text-ink-faint cursor-pointer hover:border-primary-end mb-6">
            📎 Clique ou arraste fotos/arquivos do problema
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="font-heading text-sm font-semibold border border-line rounded-lg px-4 py-2 bg-white cursor-pointer hover:bg-paper"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="font-heading text-sm font-semibold bg-primary-end text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-primary-end-hover"
            >
              Enviar chamado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}