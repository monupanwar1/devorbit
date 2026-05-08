import HeroSection from '@/components/HeroSection';
import Container from '@/components/ui/container';

export default function page() {
  return (
    <main className="bg-primary min-h-screen">
      <Container>
        <HeroSection />
      </Container>
    </main>
  );
}
