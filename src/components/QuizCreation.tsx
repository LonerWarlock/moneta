"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CopyCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingQues from "./LoadingQues";

type Props = {
  topicParams: string;
};

type Input = z.infer<typeof quizCreationSchema>;

const QuizCreation = ({topicParams}: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  const {mutate : getQuestions, isLoading} = useMutation({
    mutationFn: async ({topic, type, amount} : Input) => {
      const response = await axios.post("/api/game", {
        topic,
        type,
        amount,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: topicParams,
      type: "mcq",
      amount: 3,
    },
  });

  // create endpoint for game
  function onSubmit(input: Input) {
    setShowLoader(true);
    getQuestions({
      topic: input.topic,
      type: input.type,
      amount: input.amount,
    }, {
      onSuccess: ({gameId}) => {
        setFinished(true);
        setTimeout(() => {
          if(form.getValues("type") === "mcq"){
          router.push(`/play/mcq/${gameId}`);
        }
        else router.push(`/play/open_ended/${gameId}`);
        }, 1000)
      },
      onError: () => {
        setShowLoader(false);
      }
    })
  }

  form.watch();

  if(showLoader){
    return <LoadingQues finished={finished}/>;
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[350px] max-w-full">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Create a Quiz</CardTitle>
          <CardDescription>Enter a topic and number of questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic" {...field} />
                    </FormControl>                    
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a number"
                        {...field}
                        type="number"
                        min={3}
                        max={20}
                        onChange={(e) => {
                          form.setValue("amount", parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => form.setValue("type", "mcq")}
                  className="w-1/2 rounded-none rounded-l-lg"
                  variant={
                    form.watch("type") === "mcq" ? "default" : "secondary"
                  }
                >
                  <CopyCheck className="w-4 h-4 mr-2" /> MCQs
                </Button>
                  <Separator orientation="vertical"/>
                <Button
                  type="button"
                  onClick={() => form.setValue("type", "open_ended")}
                  className="w-1/2 rounded-none rounded-r-lg"
                  variant={
                    form.watch("type") === "open_ended" ? "default" : "secondary"
                  }
                >
                  <CopyCheck className="w-4 h-4 mr-2" /> Open Ended
                </Button>
              </div>
              <Button disabled={isLoading} type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
