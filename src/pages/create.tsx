import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import dynamic from "next/dynamic";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

const createArticleFormSchema = z.object({
  content: z.string(),
  title: z.string(),
});

// const Editor = dynamic(() => import('novel').then((mod) => mod.Editor))
const Editor = dynamic(() => import("novel").then((mod) => mod.Editor));
const CreateArticle = () => {
  const router = useRouter();
  const createArticleForm = useForm<z.infer<typeof createArticleFormSchema>>({
    resolver: zodResolver(createArticleFormSchema),
  });

  const mutateArticle = api.news.createNews.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  async function onSubmit(values: z.infer<typeof createArticleFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await mutateArticle.mutate(values);
  }

  return (
    <Form {...createArticleForm}>
      <form className="mx-10 space-y-8">
        <FormField
          control={createArticleForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createArticleForm.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormMessage />
              <FormControl>
                {/* <Input placeholder="" {...field} /> */}
                {/* <Textarea {...field} /> */}
                <Editor
                  editorProps={{}}
                  className="w-full"
                  disableLocalStorage={true}
                  defaultValue={"What Are Your Thoughts on This my "}
                  onUpdate={(editor) => {
                    console.log(editor?.storage.markdown.getMarkdown());
                    field.onChange(editor?.storage.markdown.getMarkdown());
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button onClick={createArticleForm.handleSubmit(onSubmit)}>
          Submit
          {mutateArticle.isLoading && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
export default CreateArticle;
