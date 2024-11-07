import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: 'როგორ გავცვალო კრიპტოვალუტა?',
    answer: 'კრიპტოვალუტის გასაცვლელად აირჩიეთ სასურველი ვალუტა, შეიყვანეთ თანხა და მიჰყევით ინსტრუქციებს. გაცვლის დასრულების შემდეგ თანხა ავტომატურად ჩაირიცხება თქვენს საბანკო ანგარიშზე.'
  },
  {
    question: 'რა არის მინიმალური თანხა გაცვლისთვის?',
    answer: 'მინიმალური თანხა გაცვლისთვის არის 50 USDT ან მისი ეკვივალენტი სხვა კრიპტოვალუტაში.'
  },
  {
    question: 'რამდენ ხანში სრულდება გაცვლა?',
    answer: 'გაცვლა სრულდება დაახლოებით 5-15 წუთში, ქსელის დატვირთვის მიხედვით.'
  },
  {
    question: 'რა საკომისიოა გაცვლაზე?',
    answer: 'ჩვენი საკომისიო შეადგენს 1%-ს. ქსელის საკომისიო დამოკიდებულია არჩეულ ბლოკჩეინზე.'
  },
  {
    question: 'როგორ დავრეგისტრირდე?',
    answer: 'რეგისტრაციისთვის დააჭირეთ "შესვლა" ღილაკს და აირჩიეთ "რეგისტრაცია". შეავსეთ მოთხოვნილი ინფორმაცია და დაადასტურეთ ელ.ფოსტა.'
  }
];

const Help = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">ხშირად დასმული კითხვები</h1>
        
        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-border bg-surface-secondary overflow-hidden"
            >
              <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left">
                <span className="font-medium">{faq.question}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="px-6 py-4 pt-0 text-muted-foreground">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="mt-12 p-6 rounded-xl border border-border bg-surface-secondary">
          <h2 className="text-xl font-semibold mb-4">დამატებითი კითხვები?</h2>
          <p className="text-muted-foreground mb-4">
            თუ ვერ იპოვეთ თქვენთვის საინტერესო კითხვაზე პასუხი, დაგვიკავშირდით:
          </p>
          <a 
            href="mailto:support@coinswap.ge" 
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
          >
            დაგვიკავშირდით
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;