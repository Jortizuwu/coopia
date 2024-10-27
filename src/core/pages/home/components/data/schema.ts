import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const statisticsSchema = z.object({
  id: z.string(),
  currentBalance: z.string(),
  previousBalance: z.string(),
  percentageVariation: z.string(),
  description: z.string(),
})

export type Statistics = z.infer<typeof statisticsSchema>