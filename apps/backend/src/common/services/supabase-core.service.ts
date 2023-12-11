import {
  SupabaseClient,
  createClient,
} from '@supabase/supabase-js';
import {
  from,
  map,
  Observable,
  throwError,
} from 'rxjs';
import { ErrorType, httpException } from '../../utils/http.util';
import { generateRandomId } from '../../utils/utils';
import { BaseTable } from '../model/supabase.model';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class SupaBaseCoreService {
  private tableName: string;
  private supabase: SupabaseClient;

  public initialize(url: string, key: string, tableName: string): void {
    try {
        this.tableName = tableName;
        this.supabase = createClient(
            url,
            key
          );
    } catch (error) {
        throw httpException('supabase error', ErrorType.Supabase, error);
    }
}

  save<T extends BaseTable>(data: T): Observable<T> {
    return from(
      this.supabase.from(this.tableName).upsert([data]).select()
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

  async delete(id: any): Promise<void> {
    try {
      const { error } = await this.supabase
        .from(this.tableName)
        .delete()
        .match({"id": id});
    
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
