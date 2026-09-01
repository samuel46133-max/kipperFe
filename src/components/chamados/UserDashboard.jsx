import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_LABEL = {
  aberto: "Em aberto",
  andamento: "Em andamento",
  externa: "Aguard. externa",
  concluido: "Concluída",
  finalizada: "Finalizada",
  rejeitada: "Rejeitada",
};

const STATUS_STYLE = {
  aberto: "bg-[#FFF4E0] text-[#B8730A]",
  andamento: "bg-[#E2ECFF] text-[#2952CC]",
  externa: "bg-[#F4E6FF] text-[#7A2EA6]",
  concluido: "bg-[#E1F6E8] text-[#17803D]",
  finalizada: "bg-[#E6E8EB] text-[#46505C]",
  rejeitada: "bg-[#FDE5E5] text-[#C23B3B]",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${STATUS_STYLE[status] ?? STATUS_STYLE.aberto}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

const notificacoes = [
  { texto: "Chamado #0512 foi atribuído a Carlos Lima e mudou para Em andamento.", data: "12/08/2026 11:40" },
  { texto: "Carlos Lima comentou no Chamado #0512.", data: "13/08/2026 09:12" },
  { texto: "⚠️ O supervisor marcou o Chamado #0509 como urgente.", data: "14/08/2026 08:05", urgente: true },
];

export default function UserDashboard({ tickets, onLogout }) {
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-paper">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-line">
        <h1 className="font-heading text-lg font-bold text-ink-strong">Kipper</h1>

        <div className="flex items-center gap-4 relative">
          <span className="font-body text-sm text-ink-mid">Ana Souza · Usuário comum</span>

          <button
            onClick={() => setShowNotif((v) => !v)}
            className="relative border-0 bg-transparent cursor-pointer text-lg"
          >
            🔔
            <span className="absolute -top-1 -right-1.5 bg-danger text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {notificacoes.length}
            </span>
          </button>

          <button
            onClick={onLogout}
            className="font-body text-sm text-ink-faint border-0 bg-transparent cursor-pointer hover:text-danger"
          >
            Sair
          </button>

          {showNotif && (
            <div className="absolute top-10 right-0 w-80 bg-white border border-line rounded-lg shadow-lg p-3 z-20">
              <div className="font-heading text-sm font-semibold text-ink-strong mb-2">Notificações</div>
              {notificacoes.map((n, i) => (
                <div key={i} className={`p-2 rounded-md mb-1 ${n.urgente ? "bg-[#FFF6F6]" : ""}`}>
                  <p className="font-body text-[13px] text-ink-strong">{n.texto}</p>
                  <p className="font-body text-[11px] text-ink-faint mt-0.5">{n.data}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-ink-strong">Meus chamados</h2>
            <button
            onClick={() => {
                sessionStorage.setItem("navegacaoInterna", "1");
                navigate("/chamados/novo");
            }}
            className="bg-primary-end text-white font-heading font-semibold text-sm px-4 py-2 rounded-lg cursor-pointer transition hover:bg-primary-end-hover"
            >
            + Novo chamado
            </button>
        </div>

        <div className="flex flex-col gap-4">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-line rounded-xl p-5 cursor-pointer transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-body text-xs text-ink-faint">Chamado #{t.id}</p>
                  <p className="font-heading text-base font-semibold text-ink-strong">{t.titulo}</p>
                </div>
                <StatusBadge status={t.status} />
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="font-body text-xs text-ink-mid bg-paper border border-line rounded-full px-2.5 py-1">🔧 {t.tipo}</span>
                <span className="font-body text-xs text-ink-mid bg-paper border border-line rounded-full px-2.5 py-1">📍 {t.local}</span>
                {t.patrimonio && (
                  <span className="font-body text-xs text-ink-mid bg-paper border border-line rounded-full px-2.5 py-1">🏷️ Patrimônio: {t.patrimonio}</span>
                )}
              </div>

              <p className="font-body text-sm text-ink-mid mt-3">{t.descricao}</p>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-line">
                <div className="flex gap-1">
                  {Array.from({ length: t.anexos || 0 }).map((_, i) => (
                    <span key={i} className="text-base">🖼️</span>
                  ))}
                </div>
                <span className="font-body text-xs text-ink-faint">
                  Aberto em {t.dataAbertura} por {t.abertoPor} (ID {t.abertoPorId})
                </span>
              </div>
            </div>
          ))}

          <div className="border border-dashed border-line rounded-xl p-8 text-center">
            <p className="font-body text-sm text-ink-faint">Outros chamados aparecerão aqui</p>
          </div>
        </div>
      </div>
    </div>
  );
}