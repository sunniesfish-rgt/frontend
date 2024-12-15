import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <Layout showAdminLogin>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <BookOpen className="w-24 h-24 text-primary mb-8" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          페이지가 존재하지 않습니다!?
        </p>
        <Link href="/books/list/1">
          <Button>책 목록으로 돌아가기</Button>
        </Link>
      </div>
    </Layout>
  );
}
