import Topbar from '@/components/Topbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PageContainer from '@/components/ui/PageContainer';
import ListingsPageClient from '@/components/listings/ListingsPageClient';

export default function RootPage() {
  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      <PageContainer as="main" className="pt-10 pb-12 md:pt-16 md:pb-16">
        <Hero
          title="Land Your Dream Role With Trusted Listings."
          highlight="Dream Role"
          subtitle="We bridge the gap between talent and top companies. Discover curated, high-impact internships with verified application links and daily updates."
        />

        <ListingsPageClient />
      </PageContainer>
      <Footer />
    </div>
  );
}
