import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Gift, Share2 } from "lucide-react";
import AddGift from "@/components/AddGift";

interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  link: string;
  reserved: boolean;
}

interface WishlistViewProps {
  title: string;
  description: string;
  date: string;
  gifts: Gift[];
}

export default function WishlistView({
  title,
  description,
  date,
  gifts,
}: WishlistViewProps) {
  const handleShare = () => {};

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="text-sm text-gray-500">Дата события: {date}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {gifts.map((gift) => (
            <Card key={gift.id}>
              <CardHeader>
                <CardTitle>{gift.name}</CardTitle>
                <CardDescription>{gift.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Цена: {gift.price} руб.</p>
                <a
                  href={gift.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ссылка на подарок
                </a>
              </CardContent>
              <CardFooter>
                <Button disabled={gift.reserved}>
                  {gift.reserved ? "Зарезервировано" : "Зарезервировать"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AddGift />
        <Button onClick={handleShare} variant="outline">
          <Share2 className="mr-2 h-4 w-4" /> Поделиться списком
        </Button>
      </CardFooter>
    </Card>
  );
}
