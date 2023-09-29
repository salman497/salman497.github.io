import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from './enviroment/enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private router: Router | undefined;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async signInWithGoogle(): Promise<void> {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: environment.hostULRL,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this.supabase.storage.emptyBucket(environment.supabaseKey);
    this.supabase.storage.deleteBucket(environment.supabaseKey);
    window.location.reload();
  }

  public async isAuthenticated(): Promise<boolean> {
    const session = await this.supabase.auth.getSession();
    const user = await this.getUserInfo();

    // Type guard to check if user is of type Error
    if (user instanceof Error) {
        return false;
    }

    return !!session || !!user;
}

  async getUserInfo(): Promise<User | Error> {
    const resp = await this.supabase.auth.getUser();
    return resp.error ? resp.error : resp.data.user;
  }

  public async getUserName(): Promise<string | null> {
    const user = await this.supabase.auth.getUser();
    console.log('-------->USER', user);
    // Assuming the name is stored in a property called 'full_name' inside 'user_metadata'
    return user.data.user?.user_metadata['name'] || null;
}

public async getUserIMG(): Promise<string | null> {
  const user = await this.supabase.auth.getUser();
  console.log('-------->USER', user);
  // Assuming the name is stored in a property called 'full_name' inside 'user_metadata'
  return user.data.user?.user_metadata['avatar_url'];
}


async storeMarkdown(content: any) {
  const { data, error } = await this.supabase.from('markdown')
  .insert([{ editor: content }]);
 console.log(data, error);
  // Additional methods can be added here...
  // For instance, authenticateSession(), etc. based on the original code you provided.
  // However, some methods from the original code might not fit directly into the Angular context.
  // They might need significant adjustments or might not be needed at all in the Angular app.
}
}
