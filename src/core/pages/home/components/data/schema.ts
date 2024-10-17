import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const cooperativeSchema = z.object({
  id: z.string(),
  currentBalance: z.number(),
  previousBalance: z.number(),
  percentageVariation: z.number(),
  description: z.string(),
})

export type Cooperative = z.infer<typeof cooperativeSchema>