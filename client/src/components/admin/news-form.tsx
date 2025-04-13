import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { News, insertNewsSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

// Extending the insertNewsSchema for form validation
const formSchema = insertNewsSchema.extend({
  // Add any additional form validations here if needed
});

type NewsFormValues = z.infer<typeof formSchema>;

interface NewsFormProps {
  defaultValues?: Partial<NewsFormValues>;
  newsItem?: News;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function NewsForm({ defaultValues, newsItem, onCancel, onSuccess }: NewsFormProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!newsItem;

  // Initialize the form with default values
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || (() => {
      const initialValues = {
        title: "",
        excerpt: "",
        content: "",
        category: "Artikel",
        imageUrl: "",
        date: new Date().toISOString().split('T')[0], // String format for the date input
      };
      
      if (newsItem) {
        return {
          ...newsItem,
          date: new Date(newsItem.date).toISOString().split('T')[0], // Convert date to string format
        };
      }
      
      return initialValues;
    })(),
  });

  // Mutation for creating or updating news
  const mutation = useMutation({
    mutationFn: async (data: NewsFormValues) => {
      if (isEditing && newsItem) {
        const response = await apiRequest("PATCH", `/api/news/${newsItem.id}`, data);
        return response.json();
      } else {
        const response = await apiRequest("POST", "/api/news", data);
        return response.json();
      }
    },
    onSuccess: () => {
      // Invalidate queries to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['/api/news'] });
      
      // Show success toast
      toast({
        title: isEditing ? "Berita berhasil diperbarui" : "Berita berhasil ditambahkan",
        description: isEditing 
          ? "Berita telah diperbarui dan dipublikasikan"
          : "Berita baru telah ditambahkan dan dipublikasikan",
      });
      
      // Call the success callback
      onSuccess();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan",
        description: `Gagal ${isEditing ? 'memperbarui' : 'menambahkan'} berita. ${error.message}`,
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const handleSubmit = async (data: NewsFormValues) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{isEditing ? "Edit Berita" : "Tambah Berita Baru"}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul berita" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Artikel">Artikel</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                        <SelectItem value="Komunitas">Komunitas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ringkasan</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Masukkan ringkasan berita" 
                      className="resize-none h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Masukkan konten berita" 
                      className="resize-none h-40"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Gambar</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan URL gambar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                className="bg-[#2E8B57] hover:bg-[#25704d]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : isEditing ? "Perbarui Berita" : "Tambah Berita"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}