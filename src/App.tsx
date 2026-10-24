import { FormEvent, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleCheck,
  Download,
  Gift,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type LeadForm = {
  name: string;
  whatsapp: string;
  email: string;
  niche: string;
  return_tracking: string;
  monthly_revenue: string;
};

const initialForm: LeadForm = {
  name: '',
  whatsapp: '',
  email: '',
  niche: '',
  return_tracking: '',
  monthly_revenue: '',
};

const niches = ['Produtos naturais', 'Pet shop', 'Food service', 'Outro varejo'];
const trackingOptions = ['Cartão de papel', 'Planilha', 'Sistema genérico', 'Não controlo'];
const revenueOptions = ['Até R$ 30 mil', 'R$ 30 mil a R$ 80 mil', 'R$ 80 mil a R$ 200 mil', 'Acima de R$ 200 mil'];

function App() {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field: keyof LeadForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (step === 1) {
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    const { error: insertError } = await supabase.from('ebook_leads').insert(form);

    if (insertError) {
      setError('Não conseguimos liberar seu material agora. Confira os dados e tente novamente.');
      setIsSubmitting(false);
      return;
    }

    await supabase.functions.invoke('lead-webhook', { body: form });
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const downloadGuide = () => {
    window.open('https://growthsolutionsmkt.com.br/wp-content/uploads/2026/10/O-Fim-do-Cartao-de-Papel-Fidelizacao-Inteligente.pptx.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#071014] text-[#f5f4ed]">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#071014]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Insights Assertivos, início">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#b8f546] text-[#071014]"><BarChart3 size={19} strokeWidth={2.5} /></span>
            <span className="text-sm font-bold tracking-[0.16em] text-white">INSIGHTS <span className="text-[#b8f546]">ASSERTIVOS</span></span>
          </a>
          <a href="#acesso" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#c9d0ce] transition hover:text-[#b8f546] sm:flex">Baixar o manual <ArrowDown size={15} /></a>
        </div>
      </nav>

      <section id="inicio" className="relative isolate flex min-h-screen items-center pt-24">
        <div className="hero-grid absolute inset-0 -z-10 opacity-40" />
        <div className="absolute -left-36 top-36 -z-10 h-96 w-96 rounded-full bg-[#24c9a8]/15 blur-[120px]" />
        <div className="absolute -right-48 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#b8f546]/10 blur-[130px]" />
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-20">
          <div className="animate-rise">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b8f546]/30 bg-[#b8f546]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b8f546]"><Sparkles size={14} /> E-book gratuito para varejistas</div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-[#f5f4ed] sm:text-6xl lg:text-[4.65rem]">O fim do cartão de papel<span className="text-[#b8f546]">.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#b6c0bd] sm:text-xl">Como aumentar as vendas da sua loja em até <strong className="text-white">20%</strong> com a <strong className="text-[#b8f546]">fidelização inteligente.</strong></p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#aebbb7]"><span className="flex items-center gap-2"><Check size={16} className="text-[#b8f546]" /> Método prático</span><span className="flex items-center gap-2"><Check size={16} className="text-[#b8f546]" /> Sem anúncios extras</span><span className="flex items-center gap-2"><Check size={16} className="text-[#b8f546]" /> Leitura em 12 min</span></div>

            <div className="mt-12 flex items-center gap-4 border-l-2 border-[#f47d52] pl-5"><div><p className="text-2xl font-black text-white">7x</p><p className="text-xs uppercase tracking-[0.16em] text-[#94a09d]">mais barato vender para quem já conhece sua loja</p></div><TrendingUp className="text-[#b8f546]" size={30} /></div>
          </div>

          <div id="acesso" className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#24c9a8]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#0d1d21]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
              {!submitted ? <>
                <div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b8f546]">Acesso imediato</p><h2 className="mt-2 text-2xl font-black tracking-tight text-white">Baixe o manual gratuito</h2></div><div className="grid h-11 w-11 place-items-center rounded-full bg-[#b8f546] text-[#071014]"><Download size={21} /></div></div>
                <div className="mb-6 flex gap-2"><span className="h-1 flex-1 rounded-full bg-[#b8f546]" /><span className={`h-1 flex-1 rounded-full ${step === 2 ? 'bg-[#b8f546]' : 'bg-white/15'}`} /></div>
                <p className="mb-5 text-sm leading-6 text-[#aebbb7]">{step === 1 ? 'Preencha seus dados. Você leva menos de 30 segundos.' : 'Só mais três respostas para personalizarmos seu diagnóstico.'}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {step === 1 ? <>
                    <label className="field-label">Seu nome<input required minLength={2} value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Como podemos chamar você?" /></label>
                    <label className="field-label">WhatsApp<input required value={form.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} placeholder="(00) 00000-0000" /></label>
                    <label className="field-label">Seu melhor e-mail<input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="voce@sualoja.com.br" /></label>
                  </> : <>
                    <SelectField label="Qual é o seu nicho?" value={form.niche} options={niches} onChange={(value) => updateField('niche', value)} />
                    <SelectField label="Como você controla o retorno?" value={form.return_tracking} options={trackingOptions} onChange={(value) => updateField('return_tracking', value)} />
                    <SelectField label="Faturamento mensal da loja" value={form.monthly_revenue} options={revenueOptions} onChange={(value) => updateField('monthly_revenue', value)} />
                  </>}
                  {error && <p className="rounded-lg border border-[#f47d52]/30 bg-[#f47d52]/10 px-3 py-2 text-sm text-[#ffad91]">{error}</p>}
                  <button type="submit" disabled={isSubmitting} className="cta-button mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-[#b8f546] px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#071014] transition hover:-translate-y-0.5 hover:bg-[#d0ff73] disabled:cursor-wait disabled:opacity-70">{isSubmitting ? 'Liberando seu acesso...' : step === 1 ? 'Quero baixar o manual' : 'Liberar meu manual agora'} <ArrowRight size={18} /></button>
                </form>
                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#83918d]"><ShieldCheck size={14} className="text-[#b8f546]" /> Seus dados estão protegidos. Sem spam.</div>
              </> : <div className="py-8 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#b8f546] text-[#071014]"><CircleCheck size={33} /></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#b8f546]">Acesso liberado</p><h2 className="mt-3 text-3xl font-black text-white">Seu manual está pronto.</h2><p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[#aebbb7]">Comece pela matemática da retenção e descubra onde sua loja está deixando dinheiro na mesa.</p><button onClick={downloadGuide} className="cta-button mt-7 inline-flex items-center gap-3 rounded-xl bg-[#b8f546] px-6 py-4 text-sm font-black uppercase tracking-[0.06em] text-[#071014] transition hover:-translate-y-0.5 hover:bg-[#d0ff73]"><Download size={18} /> Baixar agora</button></div>}
            </div>
          </div>
        </div>
        <a href="#problema" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#71817c] transition hover:text-[#b8f546] md:flex">Role para descobrir <ChevronDown size={16} /></a>
      </section>

      <section id="problema" className="border-y border-white/8 bg-[#0a171a] py-24 lg:py-32"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8"><div><p className="eyebrow">A conta que ninguém te mostra</p><h2 className="section-title mt-4">Se você não sabe quem não voltou nos últimos <span>60 dias</span>, sua loja está perdendo dinheiro.</h2><p className="mt-6 max-w-xl text-base leading-7 text-[#9eaaa7]">Atrair clientes novos é importante. Mas fazer isso sem entender a sua base é como encher um balde furado: você trabalha mais e lucra menos.</p></div><div className="grid gap-4 sm:grid-cols-3"><InfoCard icon={<X />} tone="orange" title="Margem menor" text="O custo de conquistar alguém novo consome sua margem." /><InfoCard icon={<X />} tone="orange" title="Sem memória" text="Cartões de papel se perdem e não guardam comportamento." /><InfoCard icon={<Check />} tone="green" title="Retorno automático" text="Um clube digital transforma compra em relacionamento." /></div></div></section>

      <section className="relative overflow-hidden py-24 lg:py-32"><div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#24c9a8]/8 blur-[100px]" /><div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8"><div className="relative mx-auto h-[29rem] w-full max-w-sm"><div className="book-shadow absolute bottom-5 left-1/2 h-6 w-64 -translate-x-1/2 rounded-full bg-[#b8f546]/20 blur-xl" /><div className="book absolute left-[14%] top-4 h-[25rem] w-[68%] rotate-[-7deg] rounded-l-md rounded-r-[5px] border border-white/20 bg-gradient-to-br from-[#173e4a] via-[#0a2029] to-[#071014] p-5 shadow-2xl"><div className="flex h-full flex-col justify-between border border-[#b8f546]/40 p-4"><div><p className="text-[10px] font-bold tracking-[0.2em] text-[#b8f546]">E-BOOK</p><p className="mt-5 text-3xl font-black leading-[.95] text-white">O FIM DO<br />CARTÃO DE<br /><span className="text-[#b8f546]">PAPEL</span></p></div><div><div className="mb-7 flex items-end gap-2"><div className="h-20 w-10 rounded-t-lg bg-[#183e47]" /><div className="h-28 w-10 rounded-t-lg bg-[#2a7272]" /><div className="h-36 w-10 rounded-t-lg bg-[#b8f546]" /></div><p className="text-[11px] leading-4 text-[#dce4de]">Como aumentar as vendas do seu varejo com fidelização inteligente.</p></div></div></div><div className="absolute bottom-16 right-0 w-40 rounded-2xl border border-[#24c9a8]/60 bg-[#0b242b] p-4 shadow-xl shadow-[#24c9a8]/20"><div className="mb-3 flex items-center justify-between"><MessageCircle size={22} className="text-[#b8f546]" /><span className="text-[9px] text-[#9eaaa7]">agora</span></div><p className="text-xs font-bold text-white">Olá, João!</p><p className="mt-1 text-[10px] leading-4 text-[#aebbb7]">Sentimos sua falta. Temos uma surpresa para você.</p></div></div><div><p className="eyebrow">Dentro do e-book</p><h2 className="section-title mt-4">Menos papel.<br /><span>Mais dados. Mais retorno.</span></h2><div className="mt-10 space-y-7"><DiscoverItem icon={<BarChart3 />} title="A matemática da retenção" text="Entenda CAC vs. LTV na prática e veja onde está o lucro escondido da sua base." /><DiscoverItem icon={<MessageCircle />} title="Scripts prontos para WhatsApp" text="Mensagens simples para resgatar clientes inativos sem parecer insistente." /><DiscoverItem icon={<Target />} title="O padrão das grandes redes" text="Como franquias blindam suas vendas contra a concorrência com regras inteligentes." /></div></div></div></section>

      <section className="border-y border-white/8 bg-[#0a171a] py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">O novo padrão do varejo</p><h2 className="section-title mt-4">Fidelização que acontece no <span>piloto automático.</span></h2><p className="mt-6 text-base leading-7 text-[#9eaaa7]">Não é sobre ter um aplicativo complicado. É sobre transformar cada compra em um próximo motivo para voltar.</p></div><div className="mt-16 grid gap-5 md:grid-cols-3"><StepCard number="01" icon={<Users />} title="Captura sem atrito" text="Seu cliente entra no programa em segundos, via WhatsApp ou QR Code." /><StepCard number="02" icon={<Gift />} title="Regras de retorno" text="Defina metas, recompensas e gatilhos que trazem o cliente de volta." /><StepCard number="03" icon={<Zap />} title="Automação 24/7" text="Comunicação personalizada e suporte sempre disponíveis para sua base." /></div></div></section>

      <section className="relative py-24 lg:py-32"><div className="mx-auto max-w-4xl px-5 text-center lg:px-8"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#b8f546] text-[#071014]"><Download size={26} /></div><h2 className="mt-7 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Pare de perder clientes<br /><span className="text-[#b8f546]">antes que eles sumam.</span></h2><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#aebbb7]">Baixe o manual gratuito e descubra como transformar relacionamento em faturamento previsível.</p><a href="#acesso" className="cta-button mt-9 inline-flex items-center gap-3 rounded-xl bg-[#b8f546] px-7 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#071014] transition hover:-translate-y-0.5 hover:bg-[#d0ff73]">Quero o manual gratuito <ArrowRight size={18} /></a></div></section>

      <footer className="border-t border-white/8 py-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-center text-xs text-[#71817c] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left"><span>© 2026 Insights Assertivos. Fidelização inteligente para varejo.</span><span className="flex items-center justify-center gap-2"><ShieldCheck size={14} /> Privacidade em primeiro lugar.</span></div></footer>
    </main>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="field-label">{label}<span className="relative block"><select required value={value} onChange={(event) => onChange(event.target.value)}><option value="">Selecione uma opção</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7f918b]" /></span></label>;
}

function InfoCard({ icon, tone, title, text }: { icon: React.ReactNode; tone: 'orange' | 'green'; title: string; text: string }) {
  return <div className="rounded-2xl border border-white/10 bg-[#101f22] p-5"><div className={`mb-6 grid h-10 w-10 place-items-center rounded-full ${tone === 'orange' ? 'bg-[#f47d52]/10 text-[#f47d52]' : 'bg-[#b8f546]/10 text-[#b8f546]'}`}>{icon}</div><h3 className="font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#8f9d99]">{text}</p></div>;
}

function DiscoverItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#b8f546]/25 bg-[#b8f546]/10 text-[#b8f546]">{icon}</div><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-[#8f9d99]">{text}</p></div></div>;
}

function StepCard({ number, icon, title, text }: { number: string; icon: React.ReactNode; title: string; text: string }) {
  return <div className="group rounded-2xl border border-white/10 bg-[#101f22] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#b8f546]/40"><div className="flex items-center justify-between"><span className="text-sm font-black tracking-[0.18em] text-[#b8f546]">{number}</span><span className="text-[#b8f546] transition group-hover:scale-110">{icon}</span></div><h3 className="mt-12 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-[#8f9d99]">{text}</p></div>;
}

export default App;
