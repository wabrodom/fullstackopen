/* 
App
  Course
    Header
    Content
      Part
      Part
    Total
*/

const Header = ({ name }) => <h2>{name}</h2>;

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);
  return <h4>Total of {sum} exercises</h4>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = (props) => {
  const parts = props.parts;
  return (
    <>
      {parts.map((obj) => (
        <Part part={obj} key={obj.id} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;