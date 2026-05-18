#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  try {
    console.log('Creating admin user...')

    // Create auth user
    const { data, error: authError } = await supabase.auth.admin.createUser({
      email: 'mwaserobison@gmail.com',
      password: 'Mwaseli1',
      email_confirm: true,
      user_metadata: {
        full_name: 'MWASE Admin',
        is_admin: true,
      },
    })

    if (authError) {
      console.error('Auth error:', authError)
      return
    }

    if (data.user) {
      console.log('✓ Admin user created:', data.user.id)

      // Update profile to mark as admin
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          is_admin: true,
          credits: 10000,
          subscription_tier: 'enterprise',
        })
        .eq('id', data.user.id)

      if (updateError) {
        console.error('Profile update error:', updateError)
      } else {
        console.log('✓ Admin profile configured')
        console.log('\nAdmin Credentials:')
        console.log('  Email: mwaserobison@gmail.com')
        console.log('  Password: Mwaseli1')
        console.log('\nAccess the admin panel at: /admin')
      }
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

createAdminUser()
