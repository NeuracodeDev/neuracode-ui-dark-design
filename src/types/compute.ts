
export interface ComputeResource {
  id: string;
  name: string;
  description: string;
  gpuType: string;
  gpuCount: number;
  cpuCores: number;
  memory: string;
  storage: string;
  hourlyPrice: number;
  monthlyPrice: number;
  availability: "high" | "medium" | "low";
  location: string;
}
