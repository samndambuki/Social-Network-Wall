import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  private async debugLocalAuth(): Promise<boolean> {
    try {
      const localUser = localStorage.getItem('user');
      console.log('Local Auth Debug:', {
        hasLocalUser: !!localUser,
        userData: localUser ? JSON.parse(localUser) : null,
      });
      return !!localUser;
    } catch (e) {
      console.error('Local Auth Debug Error:', e);
      return false;
    }
  }

  private async debugStorage(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.storage.from('images').list();
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Storage Debug Error:', e);
      return false;
    }
  }

  async uploadImage(file: File): Promise<string> {
    try {
      // Add token debug
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log('Auth Token Debug:', {
        hasToken: !!user?.access_token,
        tokenPrefix: user?.access_token?.substring(0, 10),
      });

      const filename = `${Date.now()}_${file.name}`;
      const { data, error } = await this.supabase.storage
        .from('images')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;
      console.log('Upload attempt:', { data, error });

      const {
        data: { publicUrl },
      } = this.supabase.storage.from('images').getPublicUrl(filename);

      return publicUrl;
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  }

  async testConnection() {
    try {
      const { data, error } = await this.supabase
        .from('posts')
        .select('*')
        .limit(1);

      if (error) throw error;

      console.log('Supabase connection successful:', data);
      return true;
    } catch (error) {
      console.error('Supabase connection failed:', error);
      return false;
    }
  }
}
