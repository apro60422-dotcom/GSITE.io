function parseAge(ageStr) {
  const yearsMatch = ageStr.match(/(\d+)\s*Years?/);
  const monthsMatch = ageStr.match(/(\d+)\s*Months?/);
  const years = yearsMatch ? parseInt(yearsMatch[1]) : 0;
  const months = monthsMatch ? parseInt(monthsMatch[1]) : 0;
  return years * 12 + months;
}

function extractStatementDay(dateStr) {
  const match = dateStr.match(/(\d+)(st|nd|rd|th)/);
  if (match) {
    const day = parseInt(match[1]);
    const suffix = match[2];
    return (day < 10 ? '0' : '') + day + suffix;
  }
  return dateStr;
}

function parseMoney(str) {
  return parseFloat(str.replace(/[$,]/g, ''));
}

function parseSpots(str) {
  const match = str.match(/(\d+)\s*spot/);
  return match ? parseInt(match[1]) : 1;
}

const rawData = `
  BARCLAYS
2 spot	$7,500	Jan 9th	Jan 16th - Jan 24th	6 Years 11 Months	$297
Original Price: $330	2
  CITIBANK
2 spots	$2,000	Jan 9th	Jan 16th - Jan 24th	7 Years 8 Months	$285	2
  BARCLAYS
1 spot	$35,000	Jan 9th	Jan 16th - Jan 24th	7 Years 9 Months	$590.75
Original Price: $695	2
  CHASE
2 spots	$7,000	Jan 9th	Jan 16th - Jan 24th	11 Years 1 Months	$505	4
  CHASE
1 spot	$27,800	Jan 9th	Jan 16th - Jan 24th	11 Years 5 Months	$705	4
  CAPITAL ONE
1 spot	$16,000	Jan 9th	Jan 16th - Jan 24th	11 Years 7 Months	$549
Original Price: $610	4
  CITIBANK
1 spot	$32,000	Jan 9th	Jan 16th - Jan 24th	19 Years 11 Months	$810	2
  DISCOVER
1 spot	$5,000	Jan 9th	Jan 16th - Jan 24th	6 Years 6 Months	$279
Original Price: $310	2
  CHASE
1 spot	$28,800	Jan 9th	Jan 16th - Jan 24th	9 Years 5 Months	$695	4
  CITIBANK
1 spot	$4,900	Jan 9th	Jan 16th - Jan 24th	4 Years 11 Months	$350	2
  DISCOVER
1 spot	$8,000	Jan 9th	Jan 16th - Jan 24th	8 Years 5 Months	$328.50
Original Price: $365	2
  CHASE
2 spots	$25,000	Jan 9th	Jan 16th - Jan 24th	9 Years 3 Months	$670	4
  BARCLAYS
1 spot	$31,100	Jan 9th	Jan 16th - Jan 24th	5 Years 4 Months	$459.76
Original Price: $540.90	2
  BARCLAYS
2 spots	$20,000	Jan 9th	Jan 16th - Jan 24th	6 Years 2 Months	$409.50
Original Price: $455	2
  DISCOVER
2 spots	$10,000	Jan 9th	Jan 16th - Jan 24th	4 Years 4 Months	$283.50
Original Price: $315	2
  BARCLAYS
3 spots	$21,000	Jan 9th	Jan 16th - Jan 24th	2 Years 5 Months	$342
Original Price: $380	2
  CITIBANK
2 spots	$19,000	Jan 10th	Jan 17th - Jan 25th	9 Years 0 Months	$495	2
  CITIBANK
1 spot	$22,000	Jan 10th	Jan 17th - Jan 25th	11 Years 2 Months	$560.60	2
  CHASE
1 spot	$41,000	Jan 10th	Jan 17th - Jan 25th	11 Years 1 Months	$873
Original Price: $970	4
  PNC
1 spot	$12,000	Jan 11th	Jan 18th - Jan 26th	6 Years 3 Months	$425
Original Price: $500	3
  BARCLAYS
1 spot	$23,000	Jan 11th	Jan 18th - Jan 26th	6 Years 0 Months	$437.04
Original Price: $485.60	2
  CHASE
1 spot	$26,900	Jan 11th	Jan 18th - Jan 26th	10 Years 7 Months	$630
Original Price: $700	4
  CHASE
1 spot	$28,000	Jan 11th	Jan 18th - Jan 26th	7 Years 7 Months	$711
Original Price: $790	4
  USBANK
2 spots	$15,000	Jan 11th	Jan 18th - Jan 26th	3 Years 7 Months	$370	2
  CITIBANK
1 spot	$7,300	Jan 12th	Jan 19th - Jan 27th	7 Years 6 Months	$335	2
  DISCOVER
1 spot	$3,500	Jan 12th	Jan 19th - Jan 27th	5 Years 11 Months	$252
Original Price: $280	2
  CHASE
2 spots	$18,200	Jan 12th	Jan 19th - Jan 27th	2 Years 7 Months	$450.50
Original Price: $530	4
  CAPITAL ONE
2 spots	$9,500	Jan 12th	Jan 19th - Jan 27th	4 Years 7 Months	$369
Original Price: $410	4
  CHASE
1 spot	$30,000	Jan 12th	Jan 19th - Jan 27th	8 Years 4 Months	$634.50
Original Price: $705	4
  CHASE
1 spot	$45,000	Jan 13th	Jan 20th - Jan 28th	12 Years 10 Months	$871.25
Original Price: $1,025	4
  CITIBANK
2 spots	$24,160	Jan 13th	Jan 20th - Jan 28th	21 Years 5 Months	$740	2
  USBANK
2 spots	$30,000	Jan 13th	Jan 20th - Jan 28th	6 Years 5 Months	$710	2
  CITIBANK
2 spots	$9,400	Jan 13th	Jan 20th - Jan 28th	7 Years 2 Months	$350.50	2
  USBANK
2 spots	$18,000	Jan 13th	Jan 20th - Jan 28th	4 Years 5 Months	$378
Original Price: $420	2
  PNC
1 spot	$13,000	Jan 13th	Jan 20th - Jan 28th	4 Years 8 Months	$409.95
Original Price: $455.50	3
  CAPITAL ONE
2 spots	$11,000	Jan 13th	Jan 20th - Jan 28th	4 Years 7 Months	$414
Original Price: $460	4
  CITIBANK
1 spot	$15,300	Jan 14th	Jan 21st - Jan 29th	10 Years 9 Months	$460	2
  CHASE
1 spot	$11,000	Jan 14th	Jan 21st - Jan 29th	22 Years 10 Months	$795	4
  CHASE
1 spot	$16,000	Jan 14th	Jan 21st - Jan 29th	7 Years 6 Months	$525	4
  BARCLAYS
1 spot	$3,019	Jan 14th	Jan 21st - Jan 29th	7 Years 1 Months	$288
Original Price: $320	2
  CITIBANK
1 spot	$18,500	Jan 14th	Jan 21st - Jan 29th	20 Years 7 Months	$675	2
  NFCU
1 spot	$15,800	Jan 14th	Jan 21st - Jan 29th	6 Years 0 Months	$480.25
Original Price: $565	3
  CITIBANK
1 spot	$12,000	Jan 14th	Jan 21st - Jan 29th	8 Years 11 Months	$600	2
  BARCLAYS
1 spot	$12,800	Jan 14th	Jan 21st - Jan 29th	7 Years 9 Months	$337.50
Original Price: $375	2
  CITIBANK
1 spot	$24,500	Jan 14th	Jan 21st - Jan 29th	9 Years 5 Months	$570	2
  BARCLAYS
1 spot	$31,000	Jan 14th	Jan 21st - Jan 29th	6 Years 5 Months	$527
Original Price: $620	2
  DISCOVER
1 spot	$3,000	Jan 14th	Jan 21st - Jan 29th	4 Years 2 Months	$250	2
  DISCOVER
1 spot	$5,000	Jan 14th	Jan 21st - Jan 29th	4 Years 2 Months	$300	2
  BARCLAYS
1 spot	$15,000	Jan 14th	Jan 21st - Jan 29th	2 Years 1 Months	$350	2
  CHASE
1 spot	$17,800	Jan 14th	Jan 21st - Jan 29th	14 Years 6 Months	$590.75
Original Price: $695	4
  CHASE
1 spot	$20,000	Jan 15th	Jan 22nd - Jan 30th	18 Years 7 Months	$890	4
  BARCLAYS
1 spot	$47,000	Jan 15th	Jan 22nd - Jan 30th	8 Years 2 Months	$807.50
Original Price: $950	2
  USBANK
1 spot	$25,000	Jan 15th	Jan 22nd - Jan 30th	7 Years 0 Months	$454.50
Original Price: $505	2
  CITIBANK
1 spot	$19,400	Jan 15th	Jan 22nd - Jan 30th	7 Years 11 Months	$450.90	2
  BARCLAYS
2 spots	$22,000	Jan 16th	Jan 23rd - Jan 31st	5 Years 11 Months	$423
Original Price: $470	2
  CITIBANK
2 spots	$15,180	Jan 16th	Jan 23rd - Jan 31st	14 Years 5 Months	$550	2
  PNC
1 spot	$15,000	Jan 16th	Jan 23rd - Jan 31st	5 Years 4 Months	$446.25
Original Price: $525	3
  CHASE
1 spot	$17,600	Jan 16th	Jan 23rd - Jan 31st	5 Years 8 Months	$510	4
  CHASE
1 spot	$21,500	Jan 16th	Jan 23rd - Jan 31st	5 Years 10 Months	$513
Original Price: $570	4
  CHASE
2 spots	$29,900	Jan 16th	Jan 23rd - Jan 31st	13 Years 2 Months	$850	4
  BARCLAYS
2 spots	$58,000	Jan 16th	Jan 23rd - Jan 31st	2 Years 11 Months	$877.50
Original Price: $975	2
  BARCLAYS
2 spots	$48,200	Jan 16th	Jan 23rd - Jan 31st	2 Years 2 Months	$823.50
Original Price: $915	2
  CITIBANK
1 spot	$27,000	Jan 17th	Jan 24th - Feb 1st	10 Years 0 Months	$600.20	2
  CHASE
1 spot	$20,445	Jan 17th	Jan 24th - Feb 1st	11 Years 11 Months	$655	4
  CITIBANK
2 spots	$15,960	Jan 17th	Jan 24th - Feb 1st	7 Years 10 Months	$490.10	2
  CHASE
2 spots	$16,500	Jan 17th	Jan 24th - Feb 1st	5 Years 6 Months	$445.50
Original Price: $495	4
  DISCOVER
1 spot	$1,000	Jan 17th	Jan 24th - Feb 1st	4 Years 2 Months	$240	2
  DISCOVER
1 spot	$10,500	Jan 17th	Jan 24th - Feb 1st	28 Years 8 Months	$777.75
Original Price: $915	2
  CHASE
1 spot	$37,800	Jan 18th	Jan 25th - Feb 2nd	8 Years 5 Months	$738
Original Price: $820	4
  BARCLAYS
2 spots	$20,019	Jan 18th	Jan 25th - Feb 2nd	9 Years 9 Months	$482.22
Original Price: $535.80	2
  CITIBANK
1 spot	$14,000	Jan 18th	Jan 25th - Feb 2nd	5 Years 5 Months	$390.20	2
  PNC
1 spot	$19,000	Jan 18th	Jan 25th - Feb 2nd	5 Years 4 Months	$540
Original Price: $600	3
  CAPITAL ONE
1 spot	$10,000	Jan 18th	Jan 25th - Feb 2nd	3 Years 4 Months	$405
Original Price: $450	4
  CAPITAL ONE
1 spot	$30,000	Jan 18th	Jan 25th - Feb 2nd	3 Years 10 Months	$544
Original Price: $640	4
  CHASE
1 spot	$21,600	Jan 19th	Jan 26th - Feb 3rd	13 Years 7 Months	$745	4
  DISCOVER
1 spot	$26,000	Jan 19th	Jan 26th - Feb 3rd	8 Years 11 Months	$505.75
Original Price: $595	2
  CITIBANK
2 spots	$20,000	Jan 19th	Jan 26th - Feb 3rd	9 Years 7 Months	$515	2
  CITIBANK
1 spot	$10,100	Jan 19th	Jan 26th - Feb 3rd	10 Years 6 Months	$385	2
  BARCLAYS
1 spot	$20,000	Jan 19th	Jan 26th - Feb 3rd	6 Years 4 Months	$414
Original Price: $460	2
  BARCLAYS
1 spot	$15,000	Jan 19th	Jan 26th - Feb 3rd	10 Years 11 Months	$405
Original Price: $450	2
  CAPITAL ONE
1 spot	$10,000	Jan 19th	Jan 26th - Feb 3rd	3 Years 5 Months	$382.50
Original Price: $450	4
  CHASE
1 spot	$22,000	Jan 19th	Jan 26th - Feb 3rd	12 Years 2 Months	$670	4
  CITIBANK
2 spots	$17,700	Jan 19th	Jan 26th - Feb 3rd	3 Years 10 Months	$500	2
  CHASE
1 spot	$6,000	Jan 19th	Jan 26th - Feb 3rd	8 Years 0 Months	$432
Original Price: $480	4
  CITIBANK
2 spots	$22,800	Jan 20th	Jan 27th - Feb 4th	22 Years 2 Months	$770	2
  BARCLAYS
1 spot	$14,000	Jan 20th	Jan 27th - Feb 4th	7 Years 5 Months	$400	2
  CITIBANK
1 spot	$14,500	Jan 20th	Jan 27th - Feb 4th	10 Years 6 Months	$450.20	2
  CITIBANK
2 spots	$25,500	Jan 20th	Jan 27th - Feb 4th	10 Years 0 Months	$595	2
  BARCLAYS
1 spot	$31,000	Jan 20th	Jan 27th - Feb 4th	8 Years 5 Months	$562.50
Original Price: $625	2
  CITIBANK
1 spot	$22,500	Jan 20th	Jan 27th - Feb 4th	11 Years 4 Months	$560	2
  CITIBANK
1 spot	$27,000	Jan 20th	Jan 27th - Feb 4th	9 Years 6 Months	$600	2
  ELAN
1 spot	$19,500	Jan 20th	Jan 27th - Feb 4th	5 Years 5 Months	$420	2
  DISCOVER
1 spot	$14,500	Jan 21st	Jan 28th - Feb 5th	9 Years 5 Months	$440	2
  BARCLAYS
2 spots	$30,000	Jan 21st	Jan 28th - Feb 5th	8 Years 2 Months	$620	2
  BARCLAYS
1 spot	$25,000	Jan 21st	Jan 28th - Feb 5th	9 Years 9 Months	$585.30	2
  BARCLAYS
1 spot	$22,000	Jan 21st	Jan 28th - Feb 5th	11 Years 8 Months	$476
Original Price: $560	2
  CAPITAL ONE
1 spot	$1,100	Jan 21st	Jan 28th - Feb 5th	5 Years 0 Months	$365	4
  BARCLAYS
1 spot	$20,600	Jan 21st	Jan 28th - Feb 5th	5 Years 0 Months	$450	2
  DISCOVER
1 spot	$44,000	Jan 22nd	Jan 29th - Feb 6th	19 Years 8 Months	$1,476.20	2
  DISCOVER
1 spot	$13,800	Jan 22nd	Jan 29th - Feb 6th	10 Years 4 Months	$387.09
Original Price: $430.10	2
  CHASE
1 spot	$20,000	Jan 22nd	Jan 29th - Feb 6th	11 Years 1 Months	$531.25
Original Price: $625	4
  DISCOVER
1 spot	$24,000	Jan 22nd	Jan 29th - Feb 6th	9 Years 1 Months	$480.42
Original Price: $565.20	2
  CAPITAL ONE
1 spot	$30,000	Jan 22nd	Jan 29th - Feb 6th	3 Years 9 Months	$539.75
Original Price: $635	4
  USBANK
1 spot	$11,000	Jan 22nd	Jan 29th - Feb 6th	1 Years 6 Months	$195	2
  CITIBANK
1 spot	$40,000	Jan 23rd	Jan 30th - Feb 7th	11 Years 1 Months	$910	2
  ELAN
2 spots	$30,000	Jan 23rd	Jan 30th - Feb 7th	13 Years 5 Months	$705	2
  ELAN
1 spot	$23,900	Jan 23rd	Jan 30th - Feb 7th	12 Years 7 Months	$590	2
  DISCOVER
1 spot	$9,700	Jan 23rd	Jan 30th - Feb 7th	11 Years 11 Months	$395	2
  DISCOVER
1 spot	$21,200	Jan 23rd	Jan 30th - Feb 7th	10 Years 4 Months	$820	2
  BARCLAYS
2 spots	$25,000	Jan 23rd	Jan 30th - Feb 7th	6 Years 2 Months	$495	2
  BARCLAYS
2 spots	$13,000	Jan 23rd	Jan 30th - Feb 7th	5 Years 2 Months	$375	2
  BARCLAYS
2 spots	$21,000	Jan 23rd	Jan 30th - Feb 7th	6 Years 8 Months	$470	2
  CHASE
2 spots	$15,200	Jan 23rd	Jan 30th - Feb 7th	4 Years 3 Months	$505	4
  BARCLAYS
3 spots	$10,000	Jan 23rd	Jan 30th - Feb 7th	9 Years 8 Months	$390	2
  CITIBANK
1 spot	$11,600	Jan 23rd	Jan 30th - Feb 7th	2 Years 5 Months	$360	2
  CAPITAL ONE
1 spot	$30,000	Jan 23rd	Jan 30th - Feb 7th	3 Years 9 Months	$539.75
Original Price: $635	4
  BARCLAYS
2 spots	$15,500	Jan 23rd	Jan 30th - Feb 7th	3 Years 8 Months	$375	2
  DISCOVER
2 spots	$25,500	Jan 24th	Jan 31st - Feb 8th	9 Years 8 Months	$505.75
Original Price: $595	2
  ELAN
1 spot	$25,000	Jan 24th	Jan 31st - Feb 8th	12 Years 0 Months	$544.50
Original Price: $605	2
  USBANK
1 spot	$5,000	Jan 24th	Jan 31st - Feb 8th	8 Years 8 Months	$350	2
  DISCOVER
1 spot	$3,500	Jan 24th	Jan 31st - Feb 8th	5 Years 4 Months	$295	2
  CAPITAL ONE
1 spot	$20,100	Jan 24th	Jan 31st - Feb 8th	6 Years 8 Months	$493
Original Price: $580	4
  CHASE
1 spot	$36,411	Jan 24th	Jan 31st - Feb 8th	10 Years 6 Months	$765	4
  PNC
1 spot	$19,000	Jan 24th	Jan 31st - Feb 8th	4 Years 4 Months	$399.67
Original Price: $470.20	3
  DISCOVER
1 spot	$15,900	Jan 24th	Jan 31st - Feb 8th	10 Years 7 Months	$480	2
  BARCLAYS
2 spots	$30,900	Jan 24th	Jan 31st - Feb 8th	8 Years 2 Months	$535.50
Original Price: $630	2
  CHASE
2 spots	$24,000	Jan 24th	Jan 31st - Feb 8th	7 Years 1 Months	$548.25
Original Price: $645	4
  CHASE
2 spots	$34,800	Jan 24th	Jan 31st - Feb 8th	6 Years 3 Months	$740	4
  CHASE
1 spot	$21,000	Jan 24th	Jan 31st - Feb 8th	2 Years 5 Months	$690	4
  DISCOVER
1 spot	$17,000	Jan 24th	Jan 31st - Feb 8th	13 Years 1 Months	$540	2
  USBANK
1 spot	$10,000	Jan 25th	Feb 1st - Feb 9th	4 Years 3 Months	$310	2
  PNC
1 spot	$15,000	Jan 25th	Feb 1st - Feb 9th	3 Years 10 Months	$374
Original Price: $440	3
  CITIBANK
1 spot	$35,000	Jan 26th	Feb 2nd - Feb 10th	10 Years 3 Months	$675	2
  CHASE
1 spot	$8,500	Jan 26th	Feb 2nd - Feb 10th	12 Years 5 Months	$530	4
  USBANK
1 spot	$18,000	Jan 27th	Feb 3rd - Feb 11th	9 Years 1 Months	$485.50	2
  CITIBANK
2 spots	$23,000	Jan 27th	Feb 3rd - Feb 11th	19 Years 10 Months	$750.40	2
  CHASE
1 spot	$68,000	Jan 27th	Feb 3rd - Feb 11th	9 Years 2 Months	$1,220	4
  CITIBANK
2 spots	$12,000	Jan 28th	Feb 4th - Feb 12th	13 Years 2 Months	$455.10	2
  USBANK
1 spot	$19,500	Jan 28th	Feb 4th - Feb 12th	11 Years 1 Months	$505	2
  DISCOVER
1 spot	$23,600	Jan 28th	Feb 4th - Feb 12th	9 Years 9 Months	$476
Original Price: $560	2
  BARCLAYS
2 spots	$3,000	Jan 28th	Feb 4th - Feb 12th	10 Years 9 Months	$355	2
  BARCLAYS
1 spot	$40,250	Jan 28th	Feb 4th - Feb 12th	7 Years 9 Months	$675.75
Original Price: $795	2
  CHASE
2 spots	$27,600	Jan 28th	Feb 4th - Feb 12th	6 Years 5 Months	$648
Original Price: $720	4
  ELAN
1 spot	$12,500	Jan 28th	Feb 4th - Feb 12th	10 Years 9 Months	$420	2
  BARCLAYS
1 spot	$16,000	Jan 28th	Feb 4th - Feb 12th	7 Years 4 Months	$361.25
Original Price: $425	2
  USBANK
2 spots	$30,000	Jan 28th	Feb 4th - Feb 12th	7 Years 6 Months	$558
Original Price: $620	2
  USBANK
2 spots	$16,200	Jan 28th	Feb 4th - Feb 12th	10 Years 2 Months	$470	2
  USBANK
1 spot	$10,000	Jan 28th	Feb 4th - Feb 12th	5 Years 2 Months	$340	2
  CHASE
1 spot	$25,000	Jan 28th	Feb 4th - Feb 12th	18 Years 11 Months	$934	4
  CITIBANK
2 spots	$19,000	Jan 28th	Feb 4th - Feb 12th	17 Years 1 Months	$670	2
  BARCLAYS
2 spots	$27,000	Jan 28th	Feb 4th - Feb 12th	9 Years 9 Months	$600.20	2
  DISCOVER
1 spot	$20,000	Jan 28th	Feb 4th - Feb 12th	30 Years 11 Months	$1,275	2
  CITIBANK
2 spots	$12,500	Jan 28th	Feb 4th - Feb 12th	9 Years 5 Months	$410.10	2
  ELAN
1 spot	$28,000	Jan 28th	Feb 4th - Feb 12th	14 Years 10 Months	$603
Original Price: $670	2
  CHASE
1 spot	$31,200	Jan 28th	Feb 4th - Feb 12th	4 Years 5 Months	$607.50
Original Price: $675	4
  DISCOVER
1 spot	$10,000	Jan 28th	Feb 4th - Feb 12th	3 Years 10 Months	$350	2
  NFCU
1 spot	$37,000	Jan 28th	Feb 4th - Feb 12th	3 Years 9 Months	$629
Original Price: $740	3
  ELAN
1 spot	$25,000	Jan 28th	Feb 4th - Feb 12th	2 Years 0 Months	$475	2
  ELAN
2 spots	$4,000	Jan 28th	Feb 4th - Feb 12th	3 Years 11 Months	$295	2
  CAPITAL ONE
1 spot	$12,000	Jan 28th	Feb 4th - Feb 12th	3 Years 4 Months	$427.50
Original Price: $475	4
  DISCOVER
2 spots	$8,500	Jan 28th	Feb 4th - Feb 12th	3 Years 2 Months	$430	2
  USBANK
1 spot	$15,000	Feb 1st	Feb 8th - Feb 16th	8 Years 4 Months	$391.77
Original Price: $435.30	2
  PNC
1 spot	$15,000	Feb 1st	Feb 8th - Feb 16th	11 Years 8 Months	$493
Original Price: $580	3
  BARCLAYS
1 spot	$30,000	Feb 1st	Feb 8th - Feb 16th	8 Years 2 Months	$527
Original Price: $620	2
  CHASE
1 spot	$10,505	Feb 1st	Feb 8th - Feb 16th	8 Years 9 Months	$550	4
  BARCLAYS
1 spot	$24,000	Feb 1st	Feb 8th - Feb 16th	10 Years 6 Months	$501.50
Original Price: $590	2
  CITIBANK
1 spot	$34,400	Feb 1st	Feb 8th - Feb 16th	7 Years 10 Months	$790	2
  BARCLAYS
2 spots	$33,000	Feb 1st	Feb 8th - Feb 16th	7 Years 3 Months	$480.25
Original Price: $565	2
  CITIBANK
2 spots	$34,500	Feb 1st	Feb 8th - Feb 16th	7 Years 10 Months	$590	2
  DISCOVER
1 spot	$3,000	Feb 1st	Feb 8th - Feb 16th	5 Years 2 Months	$280	2
  TD BANK
1 spot	$1,000	Feb 1st	Feb 8th - Feb 16th	5 Years 1 Months	$245	2
  BARCLAYS
1 spot	$33,900	Feb 1st	Feb 8th - Feb 16th	3 Years 9 Months	$510
Original Price: $600	2
  CHASE
1 spot	$26,000	Feb 2nd	Feb 9th - Feb 17th	11 Years 2 Months	$634.50
Original Price: $705	4
  CHASE
1 spot	$15,300	Feb 2nd	Feb 9th - Feb 17th	14 Years 10 Months	$616.50
Original Price: $685	4
  CHASE
1 spot	$21,500	Feb 2nd	Feb 9th - Feb 17th	19 Years 4 Months	$890.30	4
  CHASE
1 spot	$15,500	Feb 2nd	Feb 9th - Feb 17th	17 Years 5 Months	$727	4
  CHASE
1 spot	$21,845	Feb 2nd	Feb 9th - Feb 17th	13 Years 5 Months	$745	4
  BARCLAYS
2 spots	$3,019	Feb 2nd	Feb 9th - Feb 17th	6 Years 9 Months	$315	2
  CITIBANK
2 spots	$13,500	Feb 2nd	Feb 9th - Feb 17th	10 Years 9 Months	$430	2
  CITIBANK
1 spot	$33,100	Feb 2nd	Feb 9th - Feb 17th	6 Years 8 Months	$555.30	2
  CHASE
1 spot	$15,000	Feb 2nd	Feb 9th - Feb 17th	5 Years 5 Months	$490	4
  CHASE
1 spot	$30,000	Feb 2nd	Feb 9th - Feb 17th	14 Years 5 Months	$783
Original Price: $870	4
  BARCLAYS
1 spot	$22,500	Feb 2nd	Feb 9th - Feb 17th	5 Years 0 Months	$405
Original Price: $450	2
  BARCLAYS
1 spot	$25,000	Feb 2nd	Feb 9th - Feb 17th	4 Years 0 Months	$374
Original Price: $440	2
  BARCLAYS
2 spots	$16,700	Feb 2nd	Feb 9th - Feb 17th	3 Years 11 Months	$346.50
Original Price: $385	2
  DISCOVER
1 spot	$10,500	Feb 2nd	Feb 9th - Feb 17th	6 Years 3 Months	$306
Original Price: $360	2
  BARCLAYS
2 spots	$10,000	Feb 2nd	Feb 9th - Feb 17th	5 Years 0 Months	$380	2
  CITIBANK
2 spots	$11,300	Feb 3rd	Feb 10th - Feb 18th	9 Years 11 Months	$620	2
  DISCOVER
1 spot	$20,900	Feb 3rd	Feb 10th - Feb 18th	9 Years 9 Months	$463.25
Original Price: $545	2
  BARCLAYS
1 spot	$16,000	Feb 3rd	Feb 10th - Feb 18th	9 Years 0 Months	$414.81
Original Price: $460.90	2
  DISCOVER
1 spot	$30,900	Feb 3rd	Feb 10th - Feb 18th	8 Years 11 Months	$539.75
Original Price: $635	2
  BARCLAYS
1 spot	$12,000	Feb 3rd	Feb 10th - Feb 18th	8 Years 4 Months	$355.50
Original Price: $395	2
  DISCOVER
1 spot	$6,500	Feb 3rd	Feb 10th - Feb 18th	4 Years 5 Months	$295	2
  BARCLAYS
2 spots	$23,000	Feb 3rd	Feb 10th - Feb 18th	2 Years 3 Months	$375	2
  NFCU
1 spot	$4,200	Feb 3rd	Feb 10th - Feb 18th	5 Years 2 Months	$324
Original Price: $360	3
  CHASE
2 spots	$38,100	Feb 3rd	Feb 10th - Feb 18th	3 Years 10 Months	$810	4
  CITIBANK
2 spots	$6,800	Feb 4th	Feb 11th - Feb 19th	9 Years 1 Months	$365	2
  CITIBANK
1 spot	$19,500	Feb 4th	Feb 11th - Feb 19th	9 Years 3 Months	$500.90	2
  ELAN
1 spot	$25,000	Feb 4th	Feb 11th - Feb 19th	5 Years 0 Months	$490	2
  CHASE
2 spots	$15,300	Feb 4th	Feb 11th - Feb 19th	4 Years 8 Months	$505	4
  ELAN
1 spot	$25,000	Feb 4th	Feb 11th - Feb 19th	4 Years 7 Months	$485	2
  BARCLAYS
1 spot	$10,000	Feb 4th	Feb 11th - Feb 19th	3 Years 10 Months	$306
Original Price: $340	2
  CITIBANK
1 spot	$21,200	Feb 5th	Feb 12th - Feb 20th	14 Years 5 Months	$610	2
  BARCLAYS
2 spots	$3,019	Feb 5th	Feb 12th - Feb 20th	7 Years 2 Months	$288
Original Price: $320	2
  BARCLAYS
1 spot	$21,500	Feb 5th	Feb 12th - Feb 20th	8 Years 5 Months	$463.76
Original Price: $545.60	2
  BARCLAYS
1 spot	$10,100	Feb 5th	Feb 12th - Feb 20th	3 Years 8 Months	$279
Original Price: $310	2
  BARCLAYS
2 spots	$1,500	Feb 5th	Feb 12th - Feb 20th	1 Years 9 Months	$185	2
  BARCLAYS
2 spots	$10,000	Feb 5th	Feb 12th - Feb 20th	0 Years 11 Months	$195	2
  BARCLAYS
1 spot	$16,500	Feb 5th	Feb 12th - Feb 20th	2 Years 6 Months	$380	2
  BARCLAYS
3 spots	$26,000	Feb 5th	Feb 12th - Feb 20th	5 Years 1 Months	$495	2
  CITIBANK
2 spots	$16,020	Feb 6th	Feb 13th - Feb 21st	20 Years 11 Months	$645	2
  CITIBANK
1 spot	$20,500	Feb 6th	Feb 13th - Feb 21st	15 Years 4 Months	$590.10	2
  BARCLAYS
1 spot	$20,000	Feb 6th	Feb 13th - Feb 21st	7 Years 5 Months	$418.50
Original Price: $465	2
  CHASE
1 spot	$14,500	Feb 6th	Feb 13th - Feb 21st	13 Years 7 Months	$567
Original Price: $630	4
  DISCOVER
1 spot	$5,800	Feb 6th	Feb 13th - Feb 21st	3 Years 4 Months	$320	2
  CITIBANK
1 spot	$25,000	Feb 7th	Feb 14th - Feb 22nd	9 Years 11 Months	$585	2
  BARCLAYS
2 spots	$3,019	Feb 7th	Feb 14th - Feb 22nd	8 Years 8 Months	$333
Original Price: $370	2
  BARCLAYS
2 spots	$3,019	Feb 7th	Feb 14th - Feb 22nd	7 Years 0 Months	$288
Original Price: $320	2
  CAPITAL ONE
1 spot	$5,000	Feb 7th	Feb 14th - Feb 22nd	14 Years 5 Months	$468
Original Price: $520	4
  NFCU
1 spot	$20,500	Feb 7th	Feb 14th - Feb 22nd	10 Years 6 Months	$558
Original Price: $620	3
  DISCOVER
1 spot	$8,000	Feb 7th	Feb 14th - Feb 22nd	8 Years 11 Months	$333.63
Original Price: $370.70	2
  BARCLAYS
2 spots	$25,500	Feb 7th	Feb 14th - Feb 22nd	6 Years 5 Months	$424.80
Original Price: $472	2
  CITIBANK
1 spot	$28,000	Feb 7th	Feb 14th - Feb 22nd	13 Years 11 Months	$660.90	2
  USBANK
1 spot	$11,500	Feb 7th	Feb 14th - Feb 22nd	5 Years 5 Months	$370	2
  BARCLAYS
1 spot	$41,000	Feb 7th	Feb 14th - Feb 22nd	6 Years 6 Months	$645	2
  DISCOVER
1 spot	$8,000	Feb 7th	Feb 14th - Feb 22nd	3 Years 2 Months	$270
Original Price: $300	2
  BARCLAYS
3 spots	$30,500	Feb 7th	Feb 14th - Feb 22nd	3 Years 8 Months	$510	2
  CHASE
1 spot	$16,000	Feb 7th	Feb 14th - Feb 22nd	15 Years 4 Months	$705	4
  NFCU
1 spot	$24,000	Feb 7th	Feb 14th - Feb 22nd	3 Years 3 Months	$501.50
Original Price: $590	3
  DISCOVER
1 spot	$8,000	Feb 7th	Feb 14th - Feb 22nd	1 Years 2 Months	$175.50
Original Price: $195	2
  DISCOVER
1 spot	$8,700	Jan 8th	Jan 15th - Jan 23rd	15 Years 3 Months	$396.18
Original Price: $440.20	2
  CITIBANK
1 spot	$6,600	Jan 8th	Jan 15th - Jan 23rd	8 Years 11 Months	$360.60	2
  CITIBANK
1 spot	$21,000	Jan 8th	Jan 15th - Jan 23rd	8 Years 3 Months	$440.20	2
  CITIBANK
2 spots	$22,000	Jan 8th	Jan 15th - Jan 23rd	6 Years 11 Months	$475	2
  BARCLAYS
1 spot	$8,000	Jan 8th	Jan 15th - Jan 23rd	6 Years 5 Months	$301.50
Original Price: $335	2
  BARCLAYS
1 spot	$31,019	Jan 8th	Jan 15th - Jan 23rd	8 Years 11 Months	$569.50
Original Price: $670	2
  BARCLAYS
1 spot	$32,000	Jan 8th	Jan 15th - Jan 23rd	12 Years 1 Months	$598.50
Original Price: $665	2
  DISCOVER
1 spot	$12,000	Jan 8th	Jan 15th - Jan 23rd	2 Years 11 Months	$364.50
Original Price: $405	2
  CHASE
1 spot	$25,000	Jan 8th	Jan 15th - Jan 23rd	2 Years 6 Months	$603
Original Price: $670	4
  DISCOVER
1 spot	$3,000	Feb 1st	Feb 8th - Feb 16th	5 Years 2 Months	$280	2
`;

const lines = rawData.split('\n').filter(line => line.trim());
const parsedRows = [];
let currentLender = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line && !line.includes('$') && !line.includes('spot') && !line.includes('ID:') && !line.includes('Original Price:') && line.length > 2) {
    if (line.match(/^[A-Z][A-Z\s&]+$/) || line === 'Bank of America' || line === 'Alliant CU' || line === 'NFCU' || line === 'WELLS FARGO') {
      currentLender = line.trim();
      continue;
    }
  }
  
  if (line.includes('spot') && line.includes('$')) {
    let cleanLine = line.split('Original Price:')[0].trim();
    const parts = cleanLine.split('\t').filter(p => p.trim());
    
    if (parts.length >= 6) {
      const spots = parseSpots(parts[0]);
      const limit = parseMoney(parts[1]);
      const statementDay = extractStatementDay(parts[2]);
      const posting = parts[3];
      const ageMonths = parseAge(parts[4]);
      const price = parseMoney(parts[5]);
      
      let lenderToUse = currentLender;
      if (!lenderToUse) {
        // scan backwards for a lender line
        for (let j = i - 1; j >= 0; j--) {
          const l = lines[j].trim();
          if (l && !l.includes('$') && !l.includes('spot') && !l.includes('ID:') && !l.includes('Original Price:') && l.length > 2) {
            if (l.match(/^[A-Z][A-Z\s&]+$/) || l === 'Bank of America' || l === 'Alliant CU' || l === 'NFCU' || l === 'WELLS FARGO') {
              lenderToUse = l;
              break;
            }
          }
        }
      }
      if (!lenderToUse) {
        // scan forwards for a lender line
        for (let j = i + 1; j < lines.length; j++) {
          const l = lines[j].trim();
          if (l && !l.includes('$') && !l.includes('spot') && !l.includes('ID:') && !l.includes('Original Price:') && l.length > 2) {
            if (l.match(/^[A-Z][A-Z\s&]+$/) || l === 'Bank of America' || l === 'Alliant CU' || l === 'NFCU' || l === 'WELLS FARGO') {
              lenderToUse = l;
              break;
            }
          }
        }
      }

      if (lenderToUse) {
        parsedRows.push({
          price,
          spots,
          lender: lenderToUse,
          limit,
          ageMonths,
          statementDay,
          posting
        });
      }
    }
  }
}

const originalRows = parsedRows;

const rows = originalRows.map(item => ({
  ...item,
  price: (typeof item.price === 'number' && !isNaN(item.price)) ? item.price + 400 : item.price
}));

const tbody=document.querySelector('#linesTable tbody')
const totalCount=document.getElementById('totalCount')
let sortState={key:null,asc:true}

let currentUser = null;
let users = JSON.parse(localStorage.getItem('tradelineUsers')) || [];
let userOrders = JSON.parse(localStorage.getItem('userOrders')) || [];

// Cart functionality removed


function formatMoney(v){return '$'+v.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:2})}
function formatLimit(v){return '$'+v.toLocaleString()}
function formatAge(months){const y=Math.floor(months/12),m=months%12;return `${y} ${y===1?'year':'years'} ${m} ${m===1?'month':'months'}`}

function registerUser(userData) {
  if (users.find(user => user.email === userData.email)) {
    return { success: false, message: 'User with this email already exists' };
  }
  
  if (users.find(user => user.phone === userData.phone)) {
    return { success: false, message: 'User with this phone number already exists' };
  }
  
  if (userData.password !== userData.confirmPassword) {
    return { success: false, message: 'Passwords do not match' };
  }
  
  const newUser = {
    id: Date.now(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
    email: userData.email,
    password: userData.password,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('tradelineUsers', JSON.stringify(users));
  
  return { success: true, message: 'Registration successful!' };
}

function loginUser(email, phone, password) {
  const user = users.find(u => u.email === email && u.phone === phone && u.password === password);
  
  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, message: 'Login successful!' };
  } else {
    return { success: false, message: 'Invalid email, phone number or password' };
  }
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
}

function updateAuthUI() {
  const userInfo = document.getElementById('userInfo');
  const authButtons = document.getElementById('authButtons');
  const userName = document.getElementById('userName');
  
  if (currentUser) {
    userInfo.style.display = 'flex';
    authButtons.style.display = 'none';
    userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  } else {
    userInfo.style.display = 'none';
    authButtons.style.display = 'flex';
  }
}

function showNotification(message, isError = false) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 1001;
    background: ${isError ? 'var(--danger)' : 'var(--accent)'}; color: white; padding: 12px 20px;
    border-radius: 8px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}


function addOrder(orderData) {
  const order = {
    id: Date.now(),
    userId: currentUser.id,
    items: orderData.items,
    total: orderData.total,
    date: new Date().toISOString(),
    status: 'completed'
  };
  userOrders.push(order);
  localStorage.setItem('userOrders', JSON.stringify(userOrders));
}

function loadUserOrders() {
  if (!currentUser) return [];
  return userOrders.filter(order => order.userId === currentUser.id);
}

// Profile display removed


// Add to cart removed


// Remove from cart removed


// Clear cart removed


// Cart display removed


function showCartNotification() {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 1001;
    background: var(--accent); color: white; padding: 12px 20px;
    border-radius: 8px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  notification.textContent = 'Item added to cart!';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

let compareItems = JSON.parse(localStorage.getItem('tradelineCompare')) || [];


// isFavorite function removed


// isInCompare and toggleCompare removed



function render(data){
  if(data.length===0){
    tbody.innerHTML='<tr><td colspan="7"><div class="empty-state"><div class="empty-state-icon">🔍</div><h3>No results found</h3><p>Try adjusting your filters or search terms</p><button class="btn" onclick="resetAllFilters()">Reset Filters</button></div></td></tr>';
    const mobileCards = document.getElementById('mobileCards');
    if(mobileCards) mobileCards.innerHTML='<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>No results found</h3><p>Try adjusting your filters</p><button class="btn" onclick="resetAllFilters()">Reset Filters</button></div>';
    if(totalCount) totalCount.textContent='0';
    return;
  }
  if (!tbody) return;
  tbody.innerHTML='';
  const mobileCards = document.getElementById('mobileCards');
  if (mobileCards) mobileCards.innerHTML='';
  data.forEach((r, index)=>{
    const itemId = `${r.lender}_${r.limit}_${r.statementDay}`;
    const tr=document.createElement('tr');
    tr.className='fade-in';
    tr.innerHTML=`
      <td>${r.lender}</td>
      <td>${formatLimit(r.limit)}</td>
      <td>${r.statementDay}</td>
      <td>${r.posting}</td>
      <td>${formatAge(r.ageMonths)}</td>
      <td>${formatMoney(r.price)}</td>`;
    tbody.appendChild(tr);
    if (mobileCards) {
      const card = document.createElement('div');
      card.className = 'mobile-card';
      const itemData = JSON.stringify(r).replace(/"/g, '&quot;');
      card.innerHTML=`
        <div class="mobile-card-header">
          <div class="mobile-card-title">${r.lender}</div>
          <div class="mobile-card-price">${formatMoney(r.price)}</div>
        </div>
        <div class="mobile-card-row">
          <span class="mobile-card-label">Limit:</span>
          <span class="mobile-card-value">${formatLimit(r.limit)}</span>
        </div>
        <div class="mobile-card-row">
          <span class="mobile-card-label">Statement Day:</span>
          <span class="mobile-card-value">${r.statementDay}</span>
        </div>
        <div class="mobile-card-row">
          <span class="mobile-card-label">Posting Day:</span>
          <span class="mobile-card-value">${r.posting}</span>
        </div>
        <div class="mobile-card-row">
          <span class="mobile-card-label">Account Age:</span>
          <span class="mobile-card-value">${formatAge(r.ageMonths)}</span>
        </div>
      `;
      mobileCards.appendChild(card);
    }
  });
  if (totalCount) totalCount.textContent=data.length;
}

function sortBy(key){if(sortState.key===key){sortState.asc=!sortState.asc}else{sortState={key,asc:true}}
  const sorted=[...filteredRows()].sort((a,b)=>{let va=a[key],vb=b[key];
    if(typeof va==='string'){va=va.toLowerCase();vb=vb.toLowerCase()}
    if(va<vb)return sortState.asc?-1:1
    if(va>vb)return sortState.asc?1:-1
    return 0
  })
  render(sorted)
}

function parseRange(val){if(!val)return null; const trimmed=val.trim();if(trimmed.endsWith('+')){const num=parseInt(trimmed.replace('+','').trim());return{min:num,max:Infinity}} const [min,max]=trimmed.split('-').map(x=>parseInt(x.trim()));return{min,max}}

function inRange(value,range){if(!range)return true;return value>=range.min&&value<=range.max}

function filterData(){const priceEl=document.getElementById('priceSelect')||document.getElementById('mobilePriceSelect')
  const limitEl=document.getElementById('limitSelect')||document.getElementById('mobileLimitSelect')
  const ageEl=document.getElementById('ageSelect')||document.getElementById('mobileAgeSelect')
  const lenderEl=document.getElementById('lenderSelect')||document.getElementById('mobileLenderSelect')
  const statementEl=document.getElementById('statementSelect')||document.getElementById('mobileStatementSelect')
  const postingEl=document.getElementById('postingInput')||document.getElementById('mobilePostingInput')
  const priceR=parseRange((priceEl?.value||'').replace(/[$ ,]/g,'').replace(' +','+'))
  const limitR=parseRange((limitEl?.value||'').replace(/[$ ,]/g,'').replace(' +','+'))
  const ageR=(ageEl?.value||'').replace(' +','+')
  let ageRange=ageR?parseRange(ageR):null
  if(ageRange){
    ageRange={min:ageRange.min*12,max:ageRange.max===Infinity?Infinity:ageRange.max*12}
  }
  const lender=lenderEl?.value||''
  const statement=statementEl?.value||''
  const posting=(postingEl?.value||'').trim().toLowerCase()
  return rows.filter(r=>{
    const ageOk=!ageRange||inRange(r.ageMonths,ageRange)
    const priceOk=!priceR||inRange(r.price,priceR)
    const limitOk=!limitR||inRange(r.limit,limitR)
    const lenderOk=!lender||r.lender===lender
    const statOk=!statement||r.statementDay===statement
    const postOk=!posting||r.posting.toLowerCase().includes(posting)
    return ageOk&&priceOk&&limitOk&&lenderOk&&statOk&&postOk
  })
}

function filteredRows(){return filterData()}

document.querySelectorAll('th.sortable').forEach(th=>{th.addEventListener('click',()=>sortBy(th.dataset.key))})

function syncFilters(sourceId, targetId) {
  const source = document.getElementById(sourceId);
  const target = document.getElementById(targetId);
  if (source && target) {
    target.value = source.value;
  }
}


const filterSync = (desktopId, mobileId) => {
  const desktop = document.getElementById(desktopId);
  const mobile = document.getElementById(mobileId);
  if (desktop) {
    desktop.addEventListener('change', () => {
      if (mobile) mobile.value = desktop.value;
      render(filterData());
      saveFilterState();
    });
  }
  if (mobile) {
    mobile.addEventListener('change', () => {
      if (desktop) desktop.value = mobile.value;
      render(filterData());
      saveFilterState();
    });
  }
};

filterSync('lenderSelect', 'mobileLenderSelect');
filterSync('limitSelect', 'mobileLimitSelect');
filterSync('statementSelect', 'mobileStatementSelect');
filterSync('postingInput', 'mobilePostingInput');
filterSync('ageSelect', 'mobileAgeSelect');
filterSync('priceSelect', 'mobilePriceSelect');

document.getElementById('postingInput')?.addEventListener('input', () => {
  const mobile = document.getElementById('mobilePostingInput');
  if (mobile) mobile.value = document.getElementById('postingInput').value;
  render(filterData());
  saveFilterState();
});

document.getElementById('mobilePostingInput')?.addEventListener('input', () => {
  const desktop = document.getElementById('postingInput');
  if (desktop) desktop.value = document.getElementById('mobilePostingInput').value;
  render(filterData());
  saveFilterState();
});

// resetAllFilters removed

// resetFilters and mobileResetFilters listeners removed


// Cart icon and closeCart listeners removed


// clearCart and checkout listeners removed


// cartModal click listener removed


// Login and register event listeners removed


// Profile button and closeProfile listeners removed


// Confirmation modal listeners removed


// sendConfirmationBtn listener removed



// logoutBtn listener removed


// loginForm listener removed



// registerForm listener removed


// tab-btn and addFundsForm listeners removed






function updateCompareBar(){
  const compareBar = document.getElementById('compareBar');
  const compareItemsEl = document.getElementById('compareItems');
  if(!compareBar||!compareItemsEl) return;
  if(compareItems.length===0){
    compareBar.classList.remove('active');
    return;
  }
  compareBar.classList.add('active');
  compareItemsEl.innerHTML = compareItems.map((item,index)=>`
    <div class="compare-item">
      <div class="compare-item-header">
        <div class="compare-item-title">${item.lender}</div>
        <button class="compare-item-remove" onclick="removeFromCompare(${index})">×</button>
      </div>
      <div style="font-size:12px;color:var(--muted);">${formatLimit(item.limit)} • ${item.statementDay}</div>
      <div style="font-weight:600;color:var(--accent-600);margin-top:4px;">${formatMoney(item.price)}</div>
    </div>
  `).join('');
}

function removeFromCompare(index){
  compareItems.splice(index,1);
  localStorage.setItem('tradelineCompare',JSON.stringify(compareItems));
  updateCompareBar();
  render(filterData());
}

function showCompareModal(){
  if(compareItems.length===0){
    showNotification('No items to compare',true);
    return;
  }
  const compareTable = document.getElementById('compareTable');
  const headers = ['Lender','Limit','Statement Day','Posting Day','Account Age','Price'];
  let html = '<table style="width:100%;border-collapse:collapse;"><thead><tr>';
  headers.forEach(h=>html+=`<th style="padding:12px;border:1px solid var(--border);background:var(--accent-50);">${h}</th>`);
  html+='</tr></thead><tbody>';
  compareItems.forEach(item=>{
    html+=`<tr><td style="padding:12px;border:1px solid var(--border);">${item.lender}</td>`;
    html+=`<td style="padding:12px;border:1px solid var(--border);">${formatLimit(item.limit)}</td>`;
    html+=`<td style="padding:12px;border:1px solid var(--border);">${item.statementDay}</td>`;
    html+=`<td style="padding:12px;border:1px solid var(--border);">${item.posting}</td>`;
    html+=`<td style="padding:12px;border:1px solid var(--border);">${formatAge(item.ageMonths)}</td>`;
    html+=`<td style="padding:12px;border:1px solid var(--border);">${formatMoney(item.price)}</td></tr>`;
  });
  html+='</tbody></table>';
  compareTable.innerHTML = html;
  document.getElementById('compareModal').style.display='block';
}

// exportToCSV removed

function saveFilterState(){
  const state = {
    lender:document.getElementById('lenderSelect')?.value||'',
    limit:document.getElementById('limitSelect')?.value||'',
    statement:document.getElementById('statementSelect')?.value||'',
    age:document.getElementById('ageSelect')?.value||'',
    price:document.getElementById('priceSelect')?.value||'',
    posting:document.getElementById('postingInput')?.value||''
  };
  localStorage.setItem('tradelineFilters',JSON.stringify(state));
}

function loadFilterState(){
  const saved = localStorage.getItem('tradelineFilters');
  if(!saved) return;
  const state = JSON.parse(saved);
  if(state.lender) document.getElementById('lenderSelect').value = state.lender;
  if(state.limit) document.getElementById('limitSelect').value = state.limit;
  if(state.statement) document.getElementById('statementSelect').value = state.statement;
  if(state.age) document.getElementById('ageSelect').value = state.age;
  if(state.price) document.getElementById('priceSelect').value = state.price;
  if(state.posting) document.getElementById('postingInput').value = state.posting;
  syncFilters('lenderSelect','mobileLenderSelect');
  syncFilters('limitSelect','mobileLimitSelect');
  syncFilters('statementSelect','mobileStatementSelect');
  syncFilters('ageSelect','mobileAgeSelect');
  syncFilters('priceSelect','mobilePriceSelect');
  syncFilters('postingInput','mobilePostingInput');
  render(filterData());
}

// showFavoritesModal and showHistoryModal removed


function showLoading(){
  document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading(){
  document.getElementById('loadingOverlay').classList.remove('active');
}

// exportCSV listener removed

document.getElementById('compareNow').addEventListener('click',showCompareModal);
document.getElementById('clearCompare').addEventListener('click',()=>{
  compareItems=[];
  localStorage.setItem('tradelineCompare',JSON.stringify(compareItems));
  updateCompareBar();
  render(filterData());
});
document.getElementById('closeCompare').addEventListener('click',()=>{
  document.getElementById('compareModal').style.display='none';
});
// Favorites and history listeners removed


// searchInput event listener removed


const filterElements = ['lenderSelect','limitSelect','statementSelect','ageSelect','priceSelect','postingInput','mobileLenderSelect','mobileLimitSelect','mobileStatementSelect','mobileAgeSelect','mobilePriceSelect','mobilePostingInput'];
filterElements.forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('change',()=>{
    saveFilterState();
  });
});

const savedUser = localStorage.getItem('currentUser');
if (savedUser) {
  currentUser = JSON.parse(savedUser);
  updateAuthUI();
}

loadFilterState();
updateCompareBar();
render(rows);



(function(){
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if(!scrollToTopBtn) return;
  
  function toggleScrollButton(){
    if(window.pageYOffset>300){
      scrollToTopBtn.classList.add('visible');
    }else{
      scrollToTopBtn.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll',toggleScrollButton);
  scrollToTopBtn.addEventListener('click',()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  });
  
  toggleScrollButton();
})();

