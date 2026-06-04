import { cardRowToFlower, flowerToCardInsert } from '#/lib/card-mapper'
import type { CreateFlowerInput, Flower } from '#/lib/flower-types'
import { getSupabaseServerClient } from '#/lib/supabase-server'

export async function createFlowerRecord(
  input: CreateFlowerInput,
  stripeSessionId?: string,
  voiceMessageId?: string,
): Promise<Flower> {
  const supabase = getSupabaseServerClient()
  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()

  const { data, error } = await supabase
    .from('cards')
    .insert(
      flowerToCardInsert({
        id,
        createdAt,
        input,
        stripeSessionId,
        voiceMessageId,
      }),
    )
    .select()
    .single()

  if (error || !data) {
    throw new Error(
      `Failed to create flower: ${error?.message ?? 'Unknown error'}`,
    )
  }

  return cardRowToFlower(data)
}

export async function getFlowerById(id: string): Promise<Flower | undefined> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('cards')
    .select()
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to get flower: ${error.message}`)
  }

  return data ? cardRowToFlower(data) : undefined
}

export async function getFlowerByStripeSessionId(
  stripeSessionId: string,
): Promise<Flower | undefined> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('cards')
    .select()
    .eq('stripe_session_id', stripeSessionId)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to get flower by session: ${error.message}`)
  }

  return data ? cardRowToFlower(data) : undefined
}
