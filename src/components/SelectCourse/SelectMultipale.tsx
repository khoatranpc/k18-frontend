import React, { useEffect, useState } from "react";
import { TreeSelect } from "antd";
import { Obj } from "@/global/interface";
import { useGetListCourse } from "@/utils/hooks";

interface Props {
  courseId?: string;
  courseLevelId?: string;
  label?: string;
  shortLabelItem?: boolean;
  defaultValue?: string | string[];
  multiple?: boolean;
  onChange?: (
    dataSelect: {
      idCourse: string;
      levelHandle: string[];
    }[]
  ) => void;
  onBlur?: (
    value: {
      idCourse: string;
      levelHandle: string[];
    }[]
  ) => void;
}

const SelectCourseMultiple: React.FC<Props> = (props: Props) => {
  const { listCourse, queryListCourse } = useGetListCourse();

  const crrCourse = (listCourse?.data as Array<Obj>)?.find(
    (item) => item._id === props.courseId
  );
  const crrCourseLevel = (crrCourse?.courseLevel as Obj[])?.find(
    (item) => item._id === props.courseLevelId
  );
  const mapLabel = `${
    !props.shortLabelItem
      ? `${crrCourse?.levelCode as string} - ${
          crrCourseLevel?.levelName as string
        }`
      : (crrCourseLevel?.levelCode as string)
  }`;

  const initialLabel =
    props.courseId && props.courseLevelId
      ? props.multiple
        ? []
        : mapLabel
      : "Tên khoá - Level";

  const [value, setValue] = useState<{
    _idSelect: string | string[];
    _courseId: string | string[];
    label: string | string[];
  }>({
    _idSelect: props.multiple
      ? (props.defaultValue as string[]) || []
      : (props.defaultValue as string) || "",
    _courseId: props.multiple ? [] : props.courseId ?? "",
    label: props.defaultValue || initialLabel,
  });

  const mapTreeData =
    (listCourse?.data as Array<Obj>)?.map((item) => {
      return {
        value: item._id as string,
        title: item.courseName as string,
        children: (item.courseLevel as Array<Obj>)?.map((level) => {
          return {
            value: level._id as string,
            title: (
              <span>
                {!props.shortLabelItem
                  ? `${level.levelCode as string} - ${
                      level.levelName as string
                    }`
                  : (level.levelCode as string)}
              </span>
            ),
          };
        }),
      };
    }) || [];

  const onChange = (selected: string | string[]) => {
    if (props.multiple && Array.isArray(selected)) {
      const courseMap: { [key: string]: string[] } = {};
      selected.forEach((id) => {
        listCourse?.data.forEach((item: any) => {
          const el = item.courseLevel.find((child: any) => child._id === id);
          if (el) {
            if (!courseMap[item._id as string]) {
              courseMap[item._id as string] = [];
            }
            courseMap[item._id as string].push(id);
          }
        });
      });

      const selectedData = Object.keys(courseMap).map((idCourse) => ({
        idCourse,
        levelHandle: courseMap[idCourse],
      }));

      setValue({
        _idSelect: selected,
        _courseId: Object.keys(courseMap),
        label: selected.map((id) => {
          const course = listCourse?.data.find((item: any) =>
            item.courseLevel.some((level: any) => level._id === id)
          );
          const level = course?.courseLevel.find(
            (level: any) => level._id === id
          );
          return !props.shortLabelItem
            ? `${course?.courseName as string} - ${level?.levelCode as string}`
            : (level?.levelCode as string);
        }),
      });
      props.onChange?.(selectedData);
    } else {
      let label: string = "";
      let courseId: string = "";
      listCourse?.data.forEach((item: any) => {
        const el = item.courseLevel.find(
          (child: any) => child._id === selected
        );
        if (el) {
          label = !props.shortLabelItem
            ? `${item.courseName as string} - ${el.levelCode as string}`
            : `${el.levelCode as string}`;
          courseId = item._id as string;
        }
      });
      setValue({
        _idSelect: selected,
        _courseId: [courseId], // Ensure it's an array
        label,
      });
      props.onChange?.([
        {
          idCourse: courseId,
          levelHandle: [selected as string],
        },
      ]);
    }
  };

  useEffect(() => {
    if (!listCourse) {
      queryListCourse();
    }
  }, [listCourse]);

  return (
    <TreeSelect
      showSearch
      style={{ width: "100%" }}
      defaultValue={props.defaultValue}
      value={props.multiple ? value._idSelect : value.label}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Khoá học"
      allowClear
      multiple={props.multiple}
      onChange={onChange}
      treeData={mapTreeData}
      onBlur={() => {
        const selectedData = (
          Array.isArray(value._courseId) ? value._courseId : [value._courseId]
        ).map((idCourse) => ({
          idCourse,
          levelHandle: (Array.isArray(value._idSelect)
            ? value._idSelect
            : [value._idSelect]
          ).filter((id) => {
            const course = listCourse?.data.find(
              (item: any) => item._id === idCourse
            );
            return course?.courseLevel.some((level: any) => level._id === id);
          }),
        }));
        props.onBlur?.(selectedData);
      }}
    />
  );
};

export default SelectCourseMultiple;
