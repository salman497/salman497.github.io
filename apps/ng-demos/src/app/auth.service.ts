/* eslint-disable no-useless-catch */
import { switchMap } from 'rxjs/operators';
import { Editor, LoginUser, RevealJsState } from './revealjs/state/state';
import { Injectable } from '@angular/core';
import {
  SupabaseClient,
  User,
  createClient,
  Session,
} from '@supabase/supabase-js';
import {
  BehaviorSubject,
  EMPTY,
  from,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { environment } from './environment/environment';
import { generateRandomId, valueExist } from './revealjs/utils/basic-utils';
import { MarkdownDB } from './revealjs/models/db.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
   constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getLoginUser(): Promise<LoginUser> {
    const sessionResp = await this.supabase.auth.getSession();
    if (!valueExist(sessionResp?.data?.session)) {
      console.log('----unabel to login No session exist---', sessionResp.error);
      return {};
    }

    const { data, error} = await this.supabase.auth.getUser();
    if (error) {
      console.log('----get user error---', error);
      return {};
    }
    return {
      id: data?.user?.id,
      name: data?.user?.user_metadata['name'],
      imageUrl: data?.user?.user_metadata['avatar_url'],
    };
  }

  async signInWithGoogle(): Promise<void> {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
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
    // set empty login state
    // setTimeout(() => {
    //   //signal logout after a second
    //   this.supabase$.next({ });
    // }, 1000);

    window.location.reload();
  }

  saveEditor(data: MarkdownDB): Observable<MarkdownDB> {
    if(!data.id) {
     // delete data.id;
      data.id = generateRandomId();
    }
    return from(
      this.supabase.from('markdown').upsert([data]).select()
    ).pipe(
      map((resp) => {
        if (resp.error) {
          console.log('--------->>> save error', resp.error);
          throwError(() => resp.error);
        }
        console.log('--------->>> save', resp.data);
        return resp.data ? resp.data[0] : {};
      })
    );
  }

  getEditor$(id: number): Observable<MarkdownDB> {
    return from(
      this.supabase.from('markdown').select().eq('id', id)
    ).pipe(
      map((resp) => {
        if (resp.error) {
          console.log('--------->>> save error', resp.error);
          throwError(() => resp.error);
        }
        console.log('--------->>> save', resp.data);
        return resp.data ? resp.data[0] : {};
      })
    );
  }

  getAllUserEditors$(userId: string): Observable<MarkdownDB[]> {
    return from(
      this.supabase.from('markdown').select().eq('user_id', userId)
    ).pipe(
      map((resp) => {
        if (resp.error) {
          console.log('--------->>> save error', resp.error);
          throwError(() => resp.error);
        }
        console.log('--------->>> save', resp.data);
        return resp.data ? resp.data: [];
      })
    );
  }

  async deleteMarkdown(markdownId: any): Promise<void> {
    try {
      // Replace 'markdown' with your actual table name
      const { error } = await this.supabase
        .from("markdown")
        .delete()
        .match({"id": markdownId});
    
      if (error) {
        console.error(error);
        throw error;
      }
    
      return undefined;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
