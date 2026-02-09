import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    console.log("Seeding database...");
    
    // Seed Projects
    await storage.createProject({
      channelName: "Hub Criativo",
      subscriberCount: "193 mil inscritos",
      channelLink: "https://www.youtube.com/@hubcriativos",
      iconUrl: "/images/hub_criativo.png",
      videoEmbedHtml: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1163431842?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Hub Criativo.mp4"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
      description: "Edição dinâmica para o canal Hub Criativo, focada em retenção e estilo visual único.",
    });

    await storage.createProject({
      channelName: "Alfacon",
      subscriberCount: "2,94 mi de inscritos",
      channelLink: "https://www.youtube.com/@AlfaConBr",
      iconUrl: "/images/alfacon.png",
      videoEmbedHtml: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1163431849?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="video para port_1.mp4"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
      description: "Trabalho realizado para o gigante da educação Alfacon, mantendo a identidade séria e motivacional da marca.",
    });

    await storage.createProject({
      channelName: "Wesley dev",
      subscriberCount: "40,2 mil inscritos",
      channelLink: "https://www.youtube.com/@WESLEYOLIVEIRARADIO",
      iconUrl: "/images/wesley_dev.png",
      videoEmbedHtml: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe id="video-vimeo" src="https://player.vimeo.com/video/1163433558?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Wesley Dev"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
      description: "Edição técnica e precisa para o canal Wesley dev, com cortes ágeis e foco no conteúdo.",
    });

    // Seed Reviews
    await storage.createReview({
      channelName: "Alfacon",
      content: "Cara, o trabalho fico sensacional. Eu tava meio perdido com as ideias pro meu canal mas ele consseguio organizar tudo. Os cortes ficaram mt bons e a trilha sonora encaixo certinho no que eu queria. Super recomendo, vo chamar mais vezes com crtz pq o cara é rápido msm!!",
      avatarUrl: "/images/alfacon.png",
    });

    await storage.createReview({
      channelName: "Wesley dev",
      content: "O editor é muito profissional. Entregou antes do praso e a qualidade do video fico impecavel, msm o material original não estando tão bom. Teve um detalhesinho que pedi pra muda na cor e ele fez na hora sem reclama. Nota 10 pelo atendimento e pela pasciencia.",
      avatarUrl: "/images/wesley_dev.png",
    });

    await storage.createReview({
      channelName: "Hub Criativo",
      content: "Gente se vcs precisam de ediçao com estilo e q prende a atenção, é esse o cara. Me salvo num video q eu achei que ia dar tudo errado kkkk a edição deu outra vida pro conteúdo. O preço é justo e ele entende bem oq a gente pede. Ja virei cliente fixo!!",
      avatarUrl: "/images/hub_criativo.png",
    });
    
    console.log("Seeding complete.");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Initialize seed data
  seedDatabase().catch(err => {
    console.error("Failed to seed database:", err);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  app.get(api.reviews.list.path, async (req, res) => {
    const reviews = await storage.getReviews();
    res.json(reviews);
  });

  return httpServer;
}
