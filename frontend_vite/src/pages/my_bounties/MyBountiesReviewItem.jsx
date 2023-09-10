import { useCallback, useState } from "react";
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils';

const MyBountiesReviewItem = () => {
  const [isExpanded, setExpanded] = useState(false);

  const handleExpanded = useCallback(() => {
    setExpanded(isExpanded => !isExpanded);
  }, []);

  return (
    <div className='app-body review-item'>
      {/* <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce> */}
      <div className='flex justify-between items-center xsm:flex-col sm:text-center'>
        <div className='flex flex-col'>
          <div className='text-[16px] font-bold'>GS573KASDHK...AZEW (Worker 1)</div>
        </div>
        <div className='space-x-2'>
          <button className='flex-col justify-around space-x-2  sm:flex-col sm:text-center btn-hover border rounded-2xl px-4' onClick={handleExpanded}>
            Review
          </button>
        </div>
      </div>
      {isExpanded &&
        <div className="flex-col">
          <div className="py-2 app-gray">Title of Submission</div>
          <div className="py-2 app-gray ">Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. </div>
          <a className="py-2 app-gray " href="#">https://github.com/@username/submission-link</a>
          <div className="flex justify-end gap-2">
            <button className="rounded-2xl border px-2 py-1">Approve</button>
            <button className="rounded-2xl border px-2 py-1">Reject</button>
          </div>
        </div>
      }
      {/* </Reveal> */}
    </div>
  );
}

export default MyBountiesReviewItem;
