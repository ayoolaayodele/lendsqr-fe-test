interface UserDetailFieldProps {
  label: string;
  value: string | number;
}

export default function UserDetailField({ label, value }: UserDetailFieldProps) {
  return (
    <div className="user-detail__field">
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
}
