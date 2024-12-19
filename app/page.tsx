'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import Link from 'next/link'

interface RepositoryResponse {
  repositoryName: string;
  message: string;
  status: string;
}

export default function Page() {
  const [repositoryName, setRepositoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<RepositoryResponse | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    if (!repositoryName.trim()) {
      setError("Please enter a valid repository name.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          repositoryName: repositoryName.trim() 
        }), // Ensure this matches the backend model
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // alert(`Repository "${data.repositoryName}" submitted successfully!`);
        setResponse(data);
        setRepositoryName(""); // Reset the input field
      } else {
        setError(data.detail || "Failed to submit repository");
      }
    } catch (err) {
      console.error("Failed to submit repository:", err);
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] bg-gradient-to-b from-[#0d1117] to-[#161b22]">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <svg height="32" viewBox="0 0 16 16" width="32" className="text-white fill-current">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          <div className="space-x-4 hidden md:flex">
            <Button variant="ghost" className="text-gray-300 hover:text-white">Product</Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">Solutions</Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">Open Source</Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">Pricing</Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white">Sign in</Button>
          <Button variant="outline" className="text-gray border-gray-600 hover:border-white">Sign up</Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Universe Registration Banner */}
          <div className="bg-[#161b22] rounded-full px-4 py-2 flex items-center space-x-2 border border-gray-800">
            <span className="text-gray-400 text-sm">Register for GitHub Universe</span>
            <svg width="16" height="16" viewBox="0 0 16 16" className="text-gray-400 fill-current">
              <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"></path>
            </svg>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">
            Let's build Automate README PR
          </h1>

          {/* Subheading */}
          <p className="text-gray-400 text-xl max-w-3xl">
            Harnessed for productivity. Designed for collaboration. 
            Celebrated for built-in security. Welcome to the platform developers love.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                value={repositoryName}
                onChange={(e) => setRepositoryName(e.target.value)}
                placeholder="Enter repository name"
                className="flex-1 bg-[#0d1117] border-gray-800 text-white placeholder:text-gray-500"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#6e40c9] hover:bg-[#7e4ed3] text-white disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : 'Submit the repository'}
              </Button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            {response && (
  <div className="relative overflow-hidden rounded-lg border border-[#30363d] bg-[#0d1117] p-6 shadow-lg">
    <div className="relative z-10 space-y-4">
      <div className="flex items-center space-x-2">
        <div className={`h-2 w-2 rounded-full ${response.status.toLowerCase() === 'failed' ? 'bg-[#f85149]' : 'bg-[#238636]'}`}></div>
        <Link href={`${response.repositoryName}`} className="text-xl font-semibold text-[#58a6ff] hover:underline">
          {response.repositoryName}
        </Link>
      </div>
      <p className="text-[#7d8590]">{response.message}</p>
      <div className="flex items-center space-x-2">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
          response.status.toLowerCase() === 'failed'
            ? 'bg-[#f85149]/10 text-[#f85149]'
            : 'bg-[#1f6feb]/10 text-[#2f81f7]'
        }`}>
          {response.status}
        </span>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-[#1f6feb]/5 to-transparent"></div>
  </div>
)}
          </form>
          <Button variant="outline" className="w-full md:w-auto border-gray-600 text-gray hover:border-white">
              Start a free enterprise trial
              <svg width="16" height="16" viewBox="0 0 16 16" className="ml-2">
                <path fill="currentColor" d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"></path>
              </svg>
            </Button>

          {/* Trust Text */}
          <p className="text-gray-600 text-sm">
            Trusted by the world's leading organizations →
          </p>
        </div>
      </main>
    </div>
  )
}