const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  interface CourseNameProps {
    courseName: string;
  }

  const Header = (props: CourseNameProps) => {
    return (
      <h1>{props.courseName}</h1>
    );
  }

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: "basic"
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartBase {
    description: string;
    requirements: string[];
    kind: "special";
  }
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

  const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {courseParts.map((part) => (
          <Part key={part.name} part={part} />
        ))}
      </div>
    );
  };

  const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <p>
              <strong>{part.name}</strong> ({part.exerciseCount} exercises)
            </p>
            <p>
              <em>{part.description}</em>
            </p>
          </div>
        );
      case "group":
        return (
          <div>
            <p>
              <strong>{part.name}</strong> ({part.exerciseCount} exercises)
            </p>
            <p>Group Projects: {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <p>
              <strong>{part.name}</strong> ({part.exerciseCount} exercises)
            </p>
            <p>
              <em>{part.description}</em>
            </p>
            <p>
              Background Material:{" "}
              <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
            </p>
          </div>
        );
      case "special":
        return (
          <div>
            <p>
              <strong>{part.name}</strong> ({part.exerciseCount} exercises)
            </p>
            <p>
              <em>{part.description}</em>
            </p>
            <p>Requirements: {part.requirements.join(", ")}</p>
          </div>
        );
      default:
        return null; // This case handles any unexpected `kind` values (shouldn't happen with type safety)
    }
  };

  interface TotalExercisesProps {
    totalExercises: number;
  }

  const Total = (props: TotalExercisesProps) => {
    return (
      <p>
        Number of exercises {props.totalExercises}
      </p>
    )
  }
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;