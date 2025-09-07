// import Link from 'next/link';
import { readLottoCsv } from '@/lib/readcsv';
import { LottoMaxType } from '@/types/lottoType';
import ChartBox from '@/components/Chart';

export default async function Home() {
  const lottoData: LottoMaxType[] = await readLottoCsv();

  const generateNumbers = () => {
    const count: { [key: number]: number } = {};

    // ANALYSIS OF REGULAR NUMBERS
    lottoData.forEach((objData) => {
      objData.numbers.forEach((num) => {
        count[num] = (count[num] || 0) + 1;
      });
    });

    return count;
  };

  const numberFrequency = Object.entries(generateNumbers());

  // ANALYSIS OF BONUS NUMBER
  const generateBonusNumbers = () => {
    const count: { [key: number]: number } = {};
    // ANALYSIS OF BONUS NUMBERS, EXCLUDING ZEROS
    lottoData.forEach((objData) => {
      const bonusNum = objData.bonusNumber;
      if (bonusNum !== 0) {
        count[bonusNum] = (count[bonusNum] || 0) + 1;
      }
    });
    return count;
  };

  const bonusNumberFrequency = Object.entries(generateBonusNumbers());

  // GET 10 MONT FREQUENT NUMBERS
  const getTop10Numbers = () => {
    const allNumberCounts = generateNumbers();
    // Convert object to an array of [key, value] pairs
    const sortedNumbers = Object.entries(allNumberCounts)
      .sort(([, a], [, b]) => b - a) // Sort in descending order based on the count
      .slice(0, 10); // Get the top 10 results

    return sortedNumbers;
  };

  const top10Numbers = getTop10Numbers();

  // GET 10 LEAST FREQUENT NUMBERS
  const getLeast10Numbers = () => {
    const allNumberCounts = generateNumbers();
    // Convert object to an array of [key, value] pairs
    const sortedNumbers = Object.entries(allNumberCounts)
      .sort(([, a], [, b]) => a - b) // Sort in ascending order
      .slice(0, 10); // Get the bottom 10 results

    return sortedNumbers;
  };

  const least10Numbers = getLeast10Numbers();

  // 10 MOST FREQUENT BONUS NUMBERS
  const getTop10BonusNumbers = () => {
    const allNumberCounts = generateBonusNumbers();
    // Convert object to an array of [key, value] pairs
    const sortedNumbers = Object.entries(allNumberCounts)
      .sort(([, a], [, b]) => b - a) // Sort in descending order based on the count
      .slice(0, 10); // Get the top 10 results

    return sortedNumbers;
  };

  const top10BonusNumbers = getTop10BonusNumbers();

  // 10 LEAST FREQUENT BONUS NUMBERS
  const getLeast10BonusNumbers = () => {
    const allNumberCounts = generateBonusNumbers();
    // Convert object to an array of [key, value] pairs
    const sortedNumbers = Object.entries(allNumberCounts)
      .sort(([, a], [, b]) => a - b) // Sort in ascending order
      .slice(0, 10); // Get the bottom 10 results

    return sortedNumbers;
  };

  const least10BonusNumbers = getLeast10BonusNumbers();

  return (
    <div className='flex flex-col gap-10 mx-2.5 md:mx-20 my-12 text-center'>
      <div>
        <h1 className='text-4xl font-bold'>Lotto Max Analysis</h1>
      </div>

      <div>
        <h2 className='text-2xl font-bold'>Total number of draws:</h2>
        <p className='text-xl'>{lottoData.length}</p>
      </div>

      <div>
        <h2 className='text-2xl font-bold'>Numbers Frequency:</h2>

        <ChartBox frequency={numberFrequency} />
      </div>

      <div>
        <h2 className='text-2xl font-bold'>10 Most Frequent Numbers:</h2>

        <ChartBox frequency={top10Numbers} />
      </div>

      <div>
        <h2 className='text-2xl font-bold'>10 Least Frequent Numbers:</h2>

        <ChartBox frequency={least10Numbers} />
      </div>

      <hr />

      <div>
        <h2 className='text-2xl font-bold'>Bonus Numbers Frequency:</h2>

        <ChartBox frequency={bonusNumberFrequency} />
      </div>

      <div>
        <h2 className='text-2xl font-bold'>10 Most Frequent Bonus Numbers:</h2>

        <ChartBox frequency={top10BonusNumbers} />
      </div>

      <div>
        <h2 className='text-2xl font-bold'>10 Least Frequent Bonus Numbers:</h2>

        <ChartBox frequency={least10BonusNumbers} />
      </div>
    </div>
  );
}
