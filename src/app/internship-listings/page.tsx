import Topbar from '@/components/Topbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PageContainer from '@/components/ui/PageContainer';
import ListingsPageClient from './components/ListingsPageClient';

export default function InternshipListingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      <PageContainer as="main" className="pt-10 pb-12 md:pt-16 md:pb-16">
        <Hero
          title="Explore Premium Opportunities."
          highlight="Premium"
          subtitle="Skip the noise. We've curated high-growth internships with verified application links, clear deadlines, and daily updates."
        />

        <ListingsPageClient />
      </PageContainer>
      <Footer />
    </div>
  );
}
