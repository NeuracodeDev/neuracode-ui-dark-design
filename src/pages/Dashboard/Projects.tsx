
import React from 'react';
import { Plus, FolderOpen } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const projects = [
  {
    id: '1',
    name: 'Text Classification Model',
    description: 'A neural network for sentiment analysis and text classification tasks.',
    updatedAt: '2 days ago',
    language: 'Python'
  },
  {
    id: '2',
    name: 'Data Preprocessing Pipeline',
    description: 'Automated pipeline for cleaning and normalizing large datasets for ML models.',
    updatedAt: '1 week ago',
    language: 'Python'
  },
  {
    id: '3',
    name: 'Image Recognition API',
    description: 'REST API for object detection in images using pre-trained model.',
    updatedAt: '2 weeks ago',
    language: 'Python'
  },
  {
    id: '4',
    name: 'Recommendation System',
    description: 'Collaborative filtering system for personalized content recommendations.',
    updatedAt: '3 weeks ago',
    language: 'Python'
  },
  {
    id: '5',
    name: 'Chatbot Framework',
    description: 'Conversational AI framework for building interactive chatbots.',
    updatedAt: '1 month ago',
    language: 'JavaScript'
  },
  {
    id: '6',
    name: 'Voice Recognition Tool',
    description: 'Speech-to-text application with custom language models.',
    updatedAt: '1 month ago',
    language: 'Python'
  }
];

const Projects: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNewProject = () => {
    navigate('/dashboard/create');
    toast({
      title: "New Project",
      description: "Creating a new AI project"
    });
  };
  
  const handleImportProject = () => {
    toast({
      title: "Import Project",
      description: "Opening project import wizard"
    });
    // Here you would typically open an import modal or navigate to import page
  };
  
  const handleProjectClick = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      toast({
        title: "Opening Project",
        description: `Loading ${project.name}`
      });
      // Here you would navigate to the project details page
      console.log(`Open project ${projectId}`);
    }
  };
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background dark">
        <Sidebar />
        <SidebarRail />
        
        <SidebarInset>
          <Topbar projectName="Projects" />
          
          <div className="p-8 overflow-auto h-[calc(100vh-32px)] scrollbar-thin">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight mb-2">Projects</h1>
                  <p className="text-muted-foreground">Manage your AI projects</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button 
                    className="shadow-sm hover:shadow-md transition-shadow btn-ripple"
                    onClick={handleNewProject}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                  <Button 
                    variant="outline" 
                    className="hover:border-primary/30 hover:text-primary transition-colors"
                    onClick={handleImportProject}
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Import Project
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  updatedAt={project.updatedAt}
                  language={project.language}
                  onClick={() => handleProjectClick(project.id)}
                />
              ))}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Projects;
