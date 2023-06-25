import AdvisorPreview from './AdvisorPreview';

function AdvisorList({ advisors }) {
  return (
    <tbody>
      {advisors.map((el) => {
        return <AdvisorPreview key={el.node.id} advisor={el.node}/>
      })}
    </tbody>
  )
}

export default AdvisorList;
