import Link from 'next/link';

const page = () => {
  return (
    <div>
      <div>
        <h1 className='text-3xl font-bold'>Upload Page</h1>
      </div>
      <div>
        <form action=''>
          <input type='file' name='csv-file' id='csv-file' />
        </form>
      </div>
      <div>
        <Link href={'/'}>Go to Home</Link>
      </div>
    </div>
  );
};

export default page;
