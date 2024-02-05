import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { api } from "~/utils/api";

const Editor = dynamic(() => import("novel").then((mod) => mod.Editor));
const EditArticleSchema = z.object({ content: z.string() });

const EditArticle = () => {
  const router = useRouter();
  // console.log(router.query.slug)
  const news = api.news.getNewsBySlug.useQuery(
    { slug: router.query.slug as string },
    { enabled: router.query.slug ? true : false },
  );

  const form = useForm<z.infer<typeof EditArticleSchema>>({
    resolver: zodResolver(EditArticleSchema),
    defaultValues: {
      content: news.data?.data?.content,
    },
  });
  const mutateEditArticle = api.news.editNews.useMutation();
  async function onSubmit(values: z.infer<typeof EditArticleSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await mutateEditArticle.mutate({
      content: values.content,
      id: news.data?.data?.id as string,
    });
  }

  if (news.isLoading) return "IS loading";

  return (
    <Form {...form}>
      <form></form>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel>Content</FormLabel> */}
            <FormMessage />
            <FormControl>
              {/* <Input placeholder="" {...field} /> */}
              {/* <Textarea {...field} /> */}
              <Editor
                className="w-full"
                disableLocalStorage={true}
                defaultValue={news.data?.data?.content}
                onUpdate={(editor) => {
                  console.log(editor?.storage.markdown.getMarkdown());
                  field.onChange(editor?.storage.markdown.getMarkdown());
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button onClick={form.handleSubmit(onSubmit)}>
        Submit
        {mutateEditArticle.isLoading && <Loader2 className="animate-spin" />}
      </Button>
    </Form>
  );
};
export default EditArticle;
