import DropBoxSelect from "@shared/components/Input/DropBoxSelect";
import AdministrativeDistricts from "@shared/StaticData/AdministrativeDistricts";
import styled from "styled-components";

const cities = Object.keys(AdministrativeDistricts) as string[];

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const DistrictSelector = (districtsData: any, onChange: any) => {
  return (
    <Layout>
      시/도
      <DropBoxSelect
        name="city"
        state={districtsData["city"]}
        onChange={onChange}
        labelName="시/도"
        labelId="city"
        id="city"
        menuItems={cities}
      />
      구/시/군/면
      <DropBoxSelect
        name="gu"
        state={districtsData["gu"]}
        onChange={onChange}
        labelName="구/시/군/면"
        labelId="gu"
        id="gu"
        menuItems={
          districtsData["city"]
            ? AdministrativeDistricts[
                districtsData["city"] as keyof typeof AdministrativeDistricts
              ]
            : ["시/군을 먼저 선택해주세요"]
        }
      />
    </Layout>
  );
};

export default DistrictSelector;
