import useStore from '../store';

const CompanyAdress = () => {
  const settings = useStore((state) => state.settings);
  return (
    <div>
      <h3>{settings.companyName}</h3>
      <p>
        {settings.street}
        <br />
        {settings.city}
      </p>
    </div>
  );
};

export default CompanyAdress;
