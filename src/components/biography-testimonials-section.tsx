"use client";

import founderPortraitImage from "@/components/image 23.png";
import studioFragmentImage from "@/components/image 24.jpg";
import developerPortraitImage from "@/components/image 25.jpg";
import founderArchiveImage from "@/components/image 56.jpg";
import {
  StaggerTestimonials,
  type StaggerTestimonial,
} from "@/components/ui/stagger-testimonials";

const biographyTestimonials: StaggerTestimonial[] = [
  {
    tempId: 0,
    testimonial:
      ".წ. პერესტროიკის პერიოდში, 1988 წელს საბჭოთა კავშირმა კოოპერატივების შესახებ კანონი დაამტკიცა, რომელიც წევრთა შრომით საქმიანობაზე დაფუძნებული ორგანიზაციების შექმნის უფლებას იძლეოდა. სწორედ ამ შესაძლებლობით ისარგებლეს ახალგაზრდებმა და პირველი კოოპერატივი „იერი“ შექმნეს.",
    by: "1988 — კოოპერატივების კანონი",
    imgSrc: founderArchiveImage,
  },
  {
    tempId: 1,
    testimonial:
      "რეგისტრაციის რიგში გავიცანით ჯგუფი „ირიდა“, რომელიც სამოდელო საქმეს იწყებდა. როდესაც გაიგეს, რომ არქიტექტორები ვიყავით, გვთხოვეს, დიდუბეში ფართი გვაქვს და იქნებ გაგვიკეთოთო. ეს იყო ჩვენი პირველი დამოუკიდებელი საქმე.",
    by: "გია აბულაძე",
    imgSrc: founderPortraitImage,
  },
  {
    tempId: 2,
    testimonial:
      "ვიღებდით შეკვეთებს, ვაკეთებდით პროექტებს. იცვლებოდა გემოვნება, ახალი მაღაზიები, ოფისები, სპორტული მოედნები ჩნდებოდა.",
    by: "ირაკლი როსტომაშვილი",
    imgSrc: developerPortraitImage,
  },
  {
    tempId: 3,
    testimonial:
      "ეს სახელი ავირჩიეთ, რადგან ჩვენი ჯგუფისთვის „მზიურის“ პროექტი საამაყო იყო. გვინდოდა, ამით ჩვენი ვინაობა, ისტორია, შესაძლებლობა და გემოვნება გვეჩვენებინა.",
    by: "გია აბულაძე — მინიმალური სამუშაო სივრცე",
    imgSrc: founderPortraitImage,
  },
  {
    tempId: 4,
    testimonial:
      "მალევე გია აბულაძემ და ირაკლი როსტომაშვილმა კიდევ ერთი თამამი ნაბიჯი გადადგეს. პროექტირების პარალელურად, გადაწყვიტეს ბინათმშენებლობის სფეროშიც ეცადათ ბედი.",
    by: "1992 — არქიტექტურული სტუდიიდან დეველოპერულ კომპანიამდე",
    imgSrc: studioFragmentImage,
  },
  {
    tempId: 5,
    testimonial:
      "მანამდე კერძო ფირმა არ გვქონია, კერძო ბინები არ აშენდებოდა. კერძო მშენებლობებიც არ არსებობდა, არც მიწა იყო, არც კანონი. ეს კანონი შეგვეწყო ჩვენი მიზნებისთვის და მოვარგეთ კიდეც.",
    by: "ირაკლი როსტომაშვილი",
    imgSrc: developerPortraitImage,
  },
  {
    tempId: 6,
    testimonial:
      "კანონი „ინდივიდუალური ბინათმშენებლობის პარალელური სტრუქტურების შექმნის შესახებ“ საქართველოს მთავრობამ 1991 წლის მაისში დაამტკიცა. „მზიური“ კი პირველი ქართული კერძო სამშენებლო კომპანია გახდა.",
    by: "1991 წლის მაისი",
    imgSrc: founderArchiveImage,
  },
  {
    tempId: 7,
    testimonial:
      "„მზიურის“, როგორც დეველოპერული კომპანიის პირველი მასშტაბური პროექტი ვაჟა-ფშაველას I ჩიხის, ახალგაზრდული გამზირის, ბოლოწიკისა და ნუცუბიძის ქუჩების რეკონსტრუქცია იყო.",
    by: "პირველი მასშტაბური პროექტი",
    imgSrc: studioFragmentImage,
  },
  {
    tempId: 8,
    testimonial:
      "ეს იყო მოულოდნელი, მეგონა და თურმე აშენებული ასეთი საქმე იქნებოდა, მარტო პროექტირებას გავაკეთებდით და რაღაც მიღწეული იქნებოდა. თითით კი ვხვდებოდით, თან არ გვქონოდა, ქალაქს ბევრი ჰქონდა შენახული შესაძლებლობისთვის.",
    by: "გია აბულაძე",
    imgSrc: founderPortraitImage,
  },
  {
    tempId: 9,
    testimonial:
      "არქიტექტორიაში გაჩნდა კერძო სახლის გამაგრებითი მშენებლობების, ანტისეისმიკური სამუშაოების, ეზოების და საერთო სივრცეების ახალი მოთხოვნა. „მზიურში“ დაგროვილი გამოცდილება მათ საშუალებას აძლევდა, პროექტირება და მშენებლობა ერთიან პროცესად დაენახათ.",
    by: "სამუშაო შეხვედრა პროექტის მაგიდასთან",
    imgSrc: studioFragmentImage,
  },
  {
    tempId: 10,
    testimonial:
      "კოოპერატივი ერთი საპროექტო პროექტი კი არ აღმოჩნდა, არამედ მომავალში მშენებლობითა და ქალაქის განვითარებით დაკავებული კომპანიის დასაწყისი. სწორედ ამ გამოცდილებით დაიწყო გზა, რომელმაც არქიტექტორები, ინჟინრები და მენეჯერები ერთ გუნდად გააერთიანა.",
    by: "გია აბულაძე",
    imgSrc: founderArchiveImage,
  },
];

export function BiographyTestimonialsSection() {
  return (
    <section className="bg-stone-100 px-6 py-24 text-stone-950 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-3xl">
          <p className="font-latin text-sm uppercase tracking-[0.45em] text-stone-500">
            პერესტროიკიდან მზიურამდე
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            კოოპერატივიდან დეველოპერულ კომპანიამდე
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            თუკი მანამდე ყველა ეკონომიკურ საქმიანობას სახელმწიფო აკონტროლებდა,
            ამიერიდან მოქალაქეებს მიეცათ საშუალება ბიზნეს-ორგანიზაციები
            დაეფუძნებინათ. ამ ისტორიის ცენტრალური მოწმეები გია აბულაძე და
            ირაკლი როსტომაშვილი არიან.
          </p>
        </header>
        <StaggerTestimonials testimonials={biographyTestimonials} />
      </div>
    </section>
  );
}
