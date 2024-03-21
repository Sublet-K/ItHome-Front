import { ChangeEventHandler } from "react";
import * as s from "../_Styles/Input.styles";

export const InputText = ({
  name,
  placeholder,
  onChange,
  value,
}: {
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}) => (
  <s.InputTextCss
    name={name}
    type="text"
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    required
  />
);

export const InputEmail = ({
  emailFormatState,
  onChange,
  value,
}: {
  emailFormatState: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}) =>
  emailFormatState ? (
    <s.InputTextCss
      type="email"
      name="emailState"
      placeholder="이메일"
      onChange={onChange}
      value={value}
      required
    />
  ) : (
    <s.InputTextErrorCss
      type="email"
      name="emailState"
      placeholder="이메일"
      onChange={onChange}
      value={value}
      required
    />
  );

export const InputTelePhone = ({
  onChange,
  value,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}) => (
  <s.InputTextCss
    maxLength={13}
    type="tel"
    name="phoneState"
    placeholder="전화번호"
    onChange={onChange}
    value={value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "")}
    required
  />
);

export const InputPassword = ({
  onChange,
  value,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}) => (
  <s.InputTextCss
    type="password"
    name="passwordState"
    placeholder="비밀번호"
    onChange={onChange}
    value={value}
    required
  />
);

export const InputStudentId = ({
  onChange,
  value,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}) => (
  <s.InputTextCss
    type="tel"
    maxLength={2}
    name="studentIdState"
    placeholder="학번"
    onChange={onChange}
    value={value}
    required
  />
);

export const TextInputTag = ({
  // 용도 분석 및 비교 후, InputText와 합체 예정.
  name = "",
  value = "",
  id,
  label,
  placeholder,
  required,
  onChange,
}: {
  name: string;
  value: string;
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 float-left"
    >
      {label}
    </label>
    {required ? (
      <input
        type="text"
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required
      />
    ) : (
      <input
        type="text"
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    )}
  </div>
);

export const InputTextArea = ({
  name = "",
  value = "",
  id,
  label,
  placeholder,
  required,
  handleState,
}: {
  name: string;
  value: string;
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  handleState?: ChangeEventHandler<HTMLTextAreaElement>;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 float-left"
    >
      {label}
    </label>
    {required ? (
      <textarea
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleState}
        placeholder={placeholder}
        value={value}
        required
      />
    ) : (
      <textarea
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleState}
        placeholder={placeholder}
        value={value}
      />
    )}
  </div>
);

export const InputInteger = ({
  id,
  name = "",
  label,
  placeholder,
  value,
  required,
  handleState,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  required: boolean;
  handleState?: ChangeEventHandler<HTMLInputElement>;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 float-left"
    >
      {label}
    </label>
    {required ? (
      <input
        type="tel"
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        min="1"
        max="2147483640"
        step="1"
        onChange={handleState}
        placeholder={placeholder}
        required
      />
    ) : (
      <input
        type="tel"
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        min="1"
        max="2147483640"
        step="1"
        onChange={handleState}
        placeholder={placeholder}
      />
    )}
  </div>
);
