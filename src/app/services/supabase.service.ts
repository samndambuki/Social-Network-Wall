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

  // async uploadImage(file: File): Promise<string> {
  //   const filename = `${Date.now()}_${file.name}`;
  //   const { data, error } = await this.supabase.storage
  //     .from('images')
  //     .upload(filename, file);

  //   if (error) throw error;

  //   const {
  //     data: { publicUrl },
  //   } = this.supabase.storage.from('images').getPublicUrl(filename);
  //   return publicUrl;
  // }

  async uploadImage(file: File): Promise<string> {
    try {
      // Generate unique filename
      const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

      // Upload file
      const { data, error } = await this.supabase.storage
        .from('images')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = this.supabase.storage.from('images').getPublicUrl(filename);

      return publicUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
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
