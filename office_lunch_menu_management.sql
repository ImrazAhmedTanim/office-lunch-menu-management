--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-05-31 12:20:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 32814)
-- Name: employee_choices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_choices (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    menu_id integer NOT NULL,
    choice_date date NOT NULL
);


ALTER TABLE public.employee_choices OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 32813)
-- Name: employee_choices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_choices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_choices_id_seq OWNER TO postgres;

--
-- TOC entry 4838 (class 0 OID 0)
-- Dependencies: 222
-- Name: employee_choices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_choices_id_seq OWNED BY public.employee_choices.id;


--
-- TOC entry 219 (class 1259 OID 32789)
-- Name: employee_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_roles (
    employee_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.employee_roles OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 32770)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 32769)
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_id_seq OWNER TO postgres;

--
-- TOC entry 4839 (class 0 OID 0)
-- Dependencies: 215
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- TOC entry 221 (class 1259 OID 32805)
-- Name: menus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menus (
    id integer NOT NULL,
    menu_date date NOT NULL,
    lunch_option character varying(255) NOT NULL
);


ALTER TABLE public.menus OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 32804)
-- Name: menus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menus_id_seq OWNER TO postgres;

--
-- TOC entry 4840 (class 0 OID 0)
-- Dependencies: 220
-- Name: menus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menus_id_seq OWNED BY public.menus.id;


--
-- TOC entry 218 (class 1259 OID 32781)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role_name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 32780)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 4841 (class 0 OID 0)
-- Dependencies: 217
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 4658 (class 2604 OID 32817)
-- Name: employee_choices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_choices ALTER COLUMN id SET DEFAULT nextval('public.employee_choices_id_seq'::regclass);


--
-- TOC entry 4653 (class 2604 OID 32773)
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- TOC entry 4657 (class 2604 OID 32808)
-- Name: menus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus ALTER COLUMN id SET DEFAULT nextval('public.menus_id_seq'::regclass);


--
-- TOC entry 4656 (class 2604 OID 32784)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 4832 (class 0 OID 32814)
-- Dependencies: 223
-- Data for Name: employee_choices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_choices (id, employee_id, menu_id, choice_date) FROM stdin;
1	3	1	2024-05-28
7	5	4	2024-05-31
\.


--
-- TOC entry 4828 (class 0 OID 32789)
-- Dependencies: 219
-- Data for Name: employee_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_roles (employee_id, role_id) FROM stdin;
1	1
2	2
3	2
7	2
4	2
5	2
6	2
8	2
\.


--
-- TOC entry 4825 (class 0 OID 32770)
-- Dependencies: 216
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, name, email, password, created_at, updated_at) FROM stdin;
2	tanim	tanim.com	$2b$10$8HV9acz2wzz/w4eJO/OMbODJ6tVWojOE2cIjNYrguPbVLRrkTIWau	2024-05-27 01:03:49.84626	2024-05-27 01:03:49.84626
3	shafiq	shafiq.com	$2b$10$37EA5Q7rANou32j8ms4oIO9RQd.RDTVhAiEc7xRIERsvjAGZaADYi	2024-05-27 01:07:44.155834	2024-05-27 01:07:44.155834
4	Ali Hossain	ali@mail.com	$2b$10$gV7aFHqBGOviIN2IwLedZeqPDWh30MC9kYOMVM1/d1b0ZTWtiD8zy	2024-05-30 19:07:06.862809	2024-05-30 19:07:06.862809
5	Boro Abir	babir@mail.com	$2b$10$h9c0FQ7SoctiPwEINTGrFebwz7DbyXswaYSAcRbBVCC18o0Sm/e7C	2024-05-30 19:41:58.301203	2024-05-30 19:41:58.301203
6	sakib rahman	sakib@mail,com	$2b$10$B5gT7n2/ABUuAMI7/xPUoOi.osPoyaWYtoq1i4HQlM2B1g4reubl.	2024-05-30 20:16:43.843698	2024-05-30 20:16:43.843698
7	sami 	sami@mail.com	$2b$10$AJggfwOt00tFe.I/kxqQAOoFVzfeIazdpIaEKOiA20BsnjOZy0KIG	2024-05-30 21:48:37.924748	2024-05-30 21:48:37.924748
8	fahim ahmed	fahim@mail.com	$2b$10$JRgih1IskcoAN2tC8W1dUeJOQ/MzFeBarp9PBCo7/6WKIHVUeMRwW	2024-05-30 21:56:20.855543	2024-05-30 21:56:20.855543
1	robendevs	robendevs@admin.com	$2b$10$cJedy5jt7jzAZ0L0UgSWe.Vp4nwfbJg0cK1xn6pG5XCJPPJgvUJni	2024-05-25 23:49:14.592829	2024-05-25 23:49:14.592829
\.


--
-- TOC entry 4830 (class 0 OID 32805)
-- Dependencies: 221
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menus (id, menu_date, lunch_option) FROM stdin;
1	2024-05-28	Grilled Chicken Salad
2	2024-05-29	Vegetable Stir Fry
3	2024-05-30	grilled sesame salad
4	2024-05-31	beef kala bhuna
\.


--
-- TOC entry 4827 (class 0 OID 32781)
-- Dependencies: 218
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, role_name) FROM stdin;
1	admin
2	user
\.


--
-- TOC entry 4842 (class 0 OID 0)
-- Dependencies: 222
-- Name: employee_choices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_choices_id_seq', 7, true);


--
-- TOC entry 4843 (class 0 OID 0)
-- Dependencies: 215
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 8, true);


--
-- TOC entry 4844 (class 0 OID 0)
-- Dependencies: 220
-- Name: menus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menus_id_seq', 4, true);


--
-- TOC entry 4845 (class 0 OID 0)
-- Dependencies: 217
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 626, true);


--
-- TOC entry 4674 (class 2606 OID 32821)
-- Name: employee_choices employee_choices_employee_id_choice_date_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_choices
    ADD CONSTRAINT employee_choices_employee_id_choice_date_key UNIQUE (employee_id, choice_date);


--
-- TOC entry 4676 (class 2606 OID 32819)
-- Name: employee_choices employee_choices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_choices
    ADD CONSTRAINT employee_choices_pkey PRIMARY KEY (id);


--
-- TOC entry 4668 (class 2606 OID 32793)
-- Name: employee_roles employee_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_roles
    ADD CONSTRAINT employee_roles_pkey PRIMARY KEY (employee_id, role_id);


--
-- TOC entry 4660 (class 2606 OID 32779)
-- Name: employees employees_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);


--
-- TOC entry 4662 (class 2606 OID 32777)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- TOC entry 4670 (class 2606 OID 32812)
-- Name: menus menus_menu_date_lunch_option_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_menu_date_lunch_option_key UNIQUE (menu_date, lunch_option);


--
-- TOC entry 4672 (class 2606 OID 32810)
-- Name: menus menus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pkey PRIMARY KEY (id);


--
-- TOC entry 4664 (class 2606 OID 32786)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4666 (class 2606 OID 32788)
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- TOC entry 4679 (class 2606 OID 32822)
-- Name: employee_choices employee_choices_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_choices
    ADD CONSTRAINT employee_choices_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- TOC entry 4680 (class 2606 OID 32827)
-- Name: employee_choices employee_choices_menu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_choices
    ADD CONSTRAINT employee_choices_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON DELETE CASCADE;


--
-- TOC entry 4677 (class 2606 OID 32794)
-- Name: employee_roles employee_roles_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_roles
    ADD CONSTRAINT employee_roles_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- TOC entry 4678 (class 2606 OID 32799)
-- Name: employee_roles employee_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_roles
    ADD CONSTRAINT employee_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


-- Completed on 2024-05-31 12:20:55

--
-- PostgreSQL database dump complete
--

