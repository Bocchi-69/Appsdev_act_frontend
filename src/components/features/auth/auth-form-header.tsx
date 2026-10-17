type AuthFormHeaderProps = {
  title: string;
  description: string;
};

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <header className="text-center mb-8">
      <h2 className="text-2xl font-display font-bold tracking-tight text-brown-800">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-brown-500/80">{description}</p>
    </header>
  );
}
