export default function FormHeader({text}) {
    return (
      <div className="bg-amber-500 py-4 px-6">
        <h1 className="text-2xl font-bold text-white text-center">{text}</h1>
      </div>
    );
  }