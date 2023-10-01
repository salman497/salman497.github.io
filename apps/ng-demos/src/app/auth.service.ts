import { Editor } from './revealjs/state/state';
import { Injectable } from '@angular/core';
import {
  SupabaseClient,
  User,
  createClient,
  Session,
} from '@supabase/supabase-js';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from './environment/environment';
import { valueExist } from './revealjs/utils/basic-utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private supabase$: BehaviorSubject<{ user?: User; session?: Session }> =
    new BehaviorSubject<{ user?: User; userSession?: Session }>({});

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async init() {
    const sessionResp = await this.supabase.auth.getSession();
    if (!valueExist(sessionResp?.data?.session)) {
      console.log('----unable to login No session exist---', sessionResp.error);
      return;
    }
    const userResp = await this.supabase.auth.getUser();
    if (userResp.error) {
      console.log('----get user error---', userResp.error);
      return;
    } else {
      console.log('info:', userResp.data)
    }
    this.supabase$.next({
      user: userResp?.data?.user,
      session: sessionResp?.data?.session as Session,
    });
  }

  async signInWithGoogle(): Promise<void> {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: environment.hostURL,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  }

  async signInWithMicrosoft(): Promise<void> {
    const scopes: string[] = ['openid', 'profile', 'email'];
    await this.supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: 'https://keopaarrwhppnzememsw.supabase.co/auth/v1/callback',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: `${scopes}`,
      },
    })
  
   
  }


  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this.supabase.storage.emptyBucket(environment.supabaseKey);
    this.supabase.storage.deleteBucket(environment.supabaseKey);
    this.supabase$.next({});
    setTimeout(() => {
      //signal logout after a second
      this.supabase$.next({ });
    }, 1000);

    window.location.reload();
  }

  isAuthenticated$(): Observable<boolean> {
    return this.supabase$.pipe(
      map((obj) => valueExist(obj?.session) && valueExist(obj?.user))
    );
  }

  getUser$(): Observable<User | undefined> {
    return this.supabase$.pipe(map((obj) => obj.user));
  }

  getUserName$(): Observable<string | undefined> {
    return this.supabase$.pipe(map((obj) => obj.user?.user_metadata['name']));
  }

  getUserImage$(): Observable<string | null> {
    return this.supabase$.pipe(
      map((obj) => obj.user?.user_metadata['avatar_url'])
    );
  }
  currentlyLoggedIn(): boolean {
    return (
      valueExist(this.supabase$.value?.user) &&
      valueExist(this.supabase$.value?.session)
    );
  }

  currentlyLoggedInUser(): User {
    return this.supabase$.value?.user as User;
  }
  async saveEditor(editor: Editor): Promise<void> {
    if (this.currentlyLoggedIn()) {
      const user = this.currentlyLoggedInUser();
      const { data, error } = await this.supabase
        .from('markdown')
        .upsert([{ editor }])
        .eq('userId', user.id);

      console.log(
        '--------------saveEditor Output-----------------',
        data,
        error
      );
    }
  }



}
