// Define types for Project and Category
export interface Technology {
    image: string;
  }
  
  export interface Category {
    name: string;
  }
  
  export interface Project {
    _id: string;
    title: string; 
     featured: boolean;
    description: string;
    simpleDescription: string;
    media: { url: string }[];
    category: Category; // Adjust this if the structure is different
    technologies: Technology[];
  }