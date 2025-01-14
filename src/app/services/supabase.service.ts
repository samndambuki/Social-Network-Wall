import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Observable, from, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  // private supabase: SupabaseClient;

  // constructor() {
  //   this.supabase = createClient(
  //     environment.supabaseUrl,
  //     environment.supabaseKey
  //   );
  // }

  // async uploadImage(file: File): Promise<string> {
  //   try {
  //     // Add token debug
  //     const user = JSON.parse(localStorage.getItem('user') || '{}');
  //     console.log('Auth Token Debug:', {
  //       hasToken: !!user?.access_token,
  //       tokenPrefix: user?.access_token?.substring(0, 10),
  //     });

  //     const filename = `${Date.now()}_${file.name}`;
  //     const { data, error } = await this.supabase.storage
  //       .from('images')
  //       .upload(filename, file, {
  //         cacheControl: '3600',
  //         upsert: false,
  //       });

  //     if (error) throw error;
  //     console.log('Upload attempt:', { data, error });

  //     const {
  //       data: { publicUrl },
  //     } = this.supabase.storage.from('images').getPublicUrl(filename);

  //     return publicUrl;
  //   } catch (error) {
  //     console.error('Upload Error:', error);
  //     throw error;
  //   }
  // }

  // async testConnection() {
  //   try {
  //     const { data, error } = await this.supabase
  //       .from('posts')
  //       .select('*')
  //       .limit(1);

  //     if (error) throw error;

  //     console.log('Supabase connection successful:', data);
  //     return true;
  //   } catch (error) {
  //     console.error('Supabase connection failed:', error);
  //     return false;
  //   }
  // }
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  uploadImage(file: File): Observable<string> {
    const filename = `${Date.now()}_${file.name}`;
    return from(
      this.supabase.storage.from('images').upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      })
    ).pipe(
      map(({ data }) => {
        const {
          data: { publicUrl },
        } = this.supabase.storage.from('images').getPublicUrl(filename);
        return publicUrl;
      }),
      catchError((error) => {
        console.error('Upload failed:', error);
        throw error;
      })
    );
  }

  testConnection(): Observable<boolean> {
    return from(this.supabase.from('posts').select('*').limit(1)).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
