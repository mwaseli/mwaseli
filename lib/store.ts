import { create } from 'zustand'

interface GenerationJob {
  id: string
  type: string
  status: 'processing' | 'completed' | 'failed'
  input: any
  output: any
  error?: string
  progress?: number
}

interface GenerationStore {
  jobs: GenerationJob[]
  addJob: (job: GenerationJob) => void
  updateJob: (jobId: string, updates: Partial<GenerationJob>) => void
  removeJob: (jobId: string) => void
  clearJobs: () => void
}

export const useGenerationStore = create<GenerationStore>((set) => ({
  jobs: [],
  addJob: (job) =>
    set((state) => ({
      jobs: [job, ...state.jobs],
    })),
  updateJob: (jobId, updates) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
    })),
  removeJob: (jobId) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== jobId),
    })),
  clearJobs: () => set({ jobs: [] }),
}))
