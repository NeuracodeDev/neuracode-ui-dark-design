
import { ComputeResource } from '@/types/compute';

export const availableResources: ComputeResource[] = [
  {
    id: "res-1",
    name: "Training Basic",
    description: "Good for small to medium model training and fine-tuning",
    gpuType: "RTX 4090",
    gpuCount: 1,
    cpuCores: 8,
    memory: "64GB",
    storage: "500GB SSD",
    hourlyPrice: 0.95,
    monthlyPrice: 450,
    availability: "high",
    location: "US-East"
  },
  {
    id: "res-2",
    name: "Training Pro",
    description: "Ideal for medium to large model training and fine-tuning",
    gpuType: "A100-40GB",
    gpuCount: 2,
    cpuCores: 16,
    memory: "128GB",
    storage: "1TB SSD",
    hourlyPrice: 3.0,
    monthlyPrice: 1400,
    availability: "medium",
    location: "US-West"
  },
  {
    id: "res-3",
    name: "Inference Cluster",
    description: "Optimized for high-throughput inference workloads",
    gpuType: "A100-80GB",
    gpuCount: 4,
    cpuCores: 32,
    memory: "256GB",
    storage: "2TB SSD",
    hourlyPrice: 8.4,
    monthlyPrice: 3920,
    availability: "low",
    location: "EU-Central"
  },
  {
    id: "res-4",
    name: "Research Powerhouse",
    description: "For large-scale research and enterprise workloads",
    gpuType: "H100",
    gpuCount: 2,
    cpuCores: 24,
    memory: "320GB",
    storage: "4TB SSD",
    hourlyPrice: 7.0,
    monthlyPrice: 3200,
    availability: "medium",
    location: "Asia-Pacific"
  }
];
