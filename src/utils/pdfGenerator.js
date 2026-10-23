import { jsPDF } from 'jspdf';
import { COMPANY, PANEL_REGIONS } from '../data/companyData';

export const generatePanelBookPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Page 1: Cover & Executive Summary
  // Dark luxury cover header
  doc.setFillColor(7, 12, 24); // #070C18
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Cyan geometric accent
  doc.setFillColor(0, 240, 255);
  doc.rect(20, 25, 8, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text("ELICIT RESEARCH", 34, 38);
  
  doc.setFontSize(14);
  doc.setTextColor(0, 240, 255);
  doc.text("& INSIGHTS INC.", 34, 46);

  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text("GLOBAL PANEL SPECIFICATIONS & SAMPLING CAPABILITIES 2026", 34, 54);

  // Decorative divider
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.2);
  doc.line(20, 70, pageWidth - 20, 70);

  // Core Statistics Banner
  doc.setFillColor(17, 28, 51); // card background
  doc.roundedRect(20, 80, pageWidth - 40, 48, 4, 4, 'F');

  doc.setTextColor(0, 240, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text("5M+", 35, 100);
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Panel Members", 35, 108);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Double Opt-In Global", 35, 114);

  doc.setTextColor(16, 185, 129);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text("10K+", 90, 100);
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Surveys Completed", 90, 108);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Enterprise Studies", 90, 114);

  doc.setTextColor(139, 92, 246);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text("30M+", 145, 100);
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Rewarded So Far", 145, 108);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Incentives Distributed", 145, 114);

  // Executive Description
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text("About Our Superior Global Panel", 20, 145);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  const introText = "Our globally acknowledged panel houses solution-based research, contributed by business professionals as well as consumers. Without differentiating between any sort of data, our unbiased approach incorporates numerous questions every year which includes demographical data, adverse market characteristics, media outreach, and also personal preferences, which efficiently helps businesses gain a better understanding of diverse customer segments.\n\nOur dynamic sampling platform is directly linked to the audience representing the actual population delivering online and offline B2B and B2C samples. The platform helps businesses to access diverse and comprehensive opinions of global audiences. While it accelerates the overall data research process, the final report inculcates trustworthy, accurate, and extremely precise analytics.";
  
  const splitIntro = doc.splitTextToSize(introText, pageWidth - 40);
  doc.text(splitIntro, 20, 155);

  // Regional Reach Table Section
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text("Regional Sampling Footprint", 20, 215);

  let currentY = 225;
  PANEL_REGIONS.forEach((region, i) => {
    doc.setFillColor(13, 21, 39);
    doc.roundedRect(20, currentY, pageWidth - 40, 11, 2, 2, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 240, 255);
    doc.text(region.region, 25, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    doc.text(region.members + " panelists", 80, currentY + 7);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.text(region.coverage, 125, currentY + 7);

    currentY += 13;
  });

  // Footer Contact on Page 1
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Official Document | Elicit Research & Insights Inc. | RFQ Desk: RFQ@elicitresearch.com | info@elicitresearch.com", 20, 285);

  // Save the generated document
  doc.save("Elicit-Research-Panel-Book-2026.pdf");
};
