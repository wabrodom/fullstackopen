//// v1

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

//// subcomponents
const Header = (props) => {
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  );
};

const Content = (unicorn) => {
  console.log("the prop object", unicorn);
  const parts = unicorn.parts;
  return (
    <>
      <Part part={parts[0].name} exCount={parts[0].exercises} />
      <Part part={parts[1].name} exCount={parts[1].exercises} />
      <Part part={parts[2].name} exCount={parts[2].exercises} />
    </>
  );
};

const Part = ({ part, exCount }) => {
  return (
    <p>
      {part} {exCount}
    </p>
  );
};

const Total = ({ parts }) => {
  console.log("destructor parts array from props obj", parts);
  const totalExercises =
    parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return <p>Number of exercises {totalExercises}</p>;
};

export default App;

// //// v2 pass the course object to the props object key
// const App = () => {
//   const course = {
//     name: "Half Stack application development",
//     parts: [
//       {
//         name: "Fundamentals of React",
//         exercises: 10,
//       },
//       {
//         name: "Using props to pass data",
//         exercises: 7,
//       },
//       {
//         name: "State of a component",
//         exercises: 14,
//       },
//     ],
//   };

//   return (
//     <div>
//       <Header courseName={course} />
//       <Content course={course} />
//       <Total course={course} />
//     </div>
//   );
// };

// //// subcomponents
// const Header = (props) => {
//   return (
//     <>
//       <h1>{props.courseName.name}</h1>
//     </>
//   );
// };

// const Content = (unicorn) => {
//   console.log("the prop object", unicorn);
//   const parts = unicorn.course.parts ;
//   return (
//     <>
//       <Part part={parts[0].name} exCount={parts[0].exercises} />
//       <Part part={parts[1].name} exCount={parts[1].exercises} />
//       <Part part={parts[2].name} exCount={parts[2].exercises} />
//     </>
//   );
// };

// const Part = ({ part, exCount }) => {
//   return (
//     <p>
//       {part} {exCount}
//     </p>
//   );
// };

// const Total = (props) => {
//   const parts = props.course.parts
//   const totalExercises =
//     parts[0].exercises + parts[1].exercises + parts[2].exercises;
//   return <p>Number of exercises {totalExercises}</p>;
// };

// export default App;