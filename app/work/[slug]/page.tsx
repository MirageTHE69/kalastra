import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MotionProvider } from "@/lib/motion";
import { PROJECTS, getProject, ikImg } from "@/lib/content";
import { Cursor, Grain, ScrollProgress } from "@/components/Overlays";
import Header from "@/components/Header";
import ProjectView from "@/components/ProjectView";
import Contact from "@/components/Contact";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} — Kalastra Studio`,
    description: project.lede,
    openGraph: { images: [ikImg(project.cover, 1200)] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const i = PROJECTS.indexOf(project);
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <MotionProvider>
      <div className="site">
        <Grain />
        <Cursor />
        <ScrollProgress />
        <Header />
        <main>
          <ProjectView project={project} next={next} />
          <Contact />
        </main>
      </div>
    </MotionProvider>
  );
}
