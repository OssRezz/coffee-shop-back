PGDMP              
        }            postgres    17.2    17.2 W    =           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            >           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            @           1262    5    postgres    DATABASE     t   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE postgres;
                     OssRezz    false            A           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                        OssRezz    false    4416                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            B           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            `           1247    16472 
   SaleStatus    TYPE     m   CREATE TYPE public."SaleStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'CANCELLED',
    'REFUNDED'
);
    DROP TYPE public."SaleStatus";
       public               OssRezz    false    4            c           1247    16482    TransactionStatus    TYPE     }   CREATE TYPE public."TransactionStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'DECLINED',
    'VOIDED',
    'ERROR'
);
 &   DROP TYPE public."TransactionStatus";
       public               OssRezz    false    4            �            1259    16493    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap r       OssRezz    false    4            �            1259    16500 	   customers    TABLE     �   CREATE TABLE public.customers (
    id integer NOT NULL,
    document_number text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    cellphone text NOT NULL
);
    DROP TABLE public.customers;
       public         heap r       OssRezz    false    4            �            1259    16505    customers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.customers_id_seq;
       public               OssRezz    false    218    4            C           0    0    customers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;
          public               OssRezz    false    219            �            1259    16506    entries    TABLE       CREATE TABLE public.entries (
    id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.entries;
       public         heap r       OssRezz    false    4            �            1259    16510    entries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.entries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.entries_id_seq;
       public               OssRezz    false    4    220            D           0    0    entries_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.entries_id_seq OWNED BY public.entries.id;
          public               OssRezz    false    221            �            1259    16511    inventories    TABLE       CREATE TABLE public.inventories (
    id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.inventories;
       public         heap r       OssRezz    false    4            �            1259    16515    inventories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inventories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.inventories_id_seq;
       public               OssRezz    false    4    222            E           0    0    inventories_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.inventories_id_seq OWNED BY public.inventories.id;
          public               OssRezz    false    223            �            1259    16516    product_types    TABLE     W   CREATE TABLE public.product_types (
    id integer NOT NULL,
    name text NOT NULL
);
 !   DROP TABLE public.product_types;
       public         heap r       OssRezz    false    4            �            1259    16521    product_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.product_types_id_seq;
       public               OssRezz    false    4    224            F           0    0    product_types_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.product_types_id_seq OWNED BY public.product_types.id;
          public               OssRezz    false    225            �            1259    16522    products    TABLE     �  CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    product_type_id integer NOT NULL,
    region_id integer NOT NULL,
    description text NOT NULL,
    price numeric(10,3) NOT NULL,
    image text,
    status boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.products;
       public         heap r       OssRezz    false    4            �            1259    16529    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public               OssRezz    false    4    226            G           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public               OssRezz    false    227            �            1259    16530    regions    TABLE     Q   CREATE TABLE public.regions (
    id integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public.regions;
       public         heap r       OssRezz    false    4            �            1259    16535    regions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.regions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.regions_id_seq;
       public               OssRezz    false    4    228            H           0    0    regions_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.regions_id_seq OWNED BY public.regions.id;
          public               OssRezz    false    229            �            1259    16536    sale_details    TABLE     �   CREATE TABLE public.sale_details (
    id integer NOT NULL,
    sale_id integer NOT NULL,
    product_id integer NOT NULL,
    price numeric(10,2) NOT NULL,
    quantity integer NOT NULL
);
     DROP TABLE public.sale_details;
       public         heap r       OssRezz    false    4            �            1259    16539    sale_details_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sale_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.sale_details_id_seq;
       public               OssRezz    false    230    4            I           0    0    sale_details_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.sale_details_id_seq OWNED BY public.sale_details.id;
          public               OssRezz    false    231            �            1259    16540    sales    TABLE     q  CREATE TABLE public.sales (
    id integer NOT NULL,
    transaction_id integer,
    address text NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    status public."SaleStatus" DEFAULT 'PENDING'::public."SaleStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.sales;
       public         heap r       OssRezz    false    864    864    4            �            1259    16547    sales_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.sales_id_seq;
       public               OssRezz    false    4    232            J           0    0    sales_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.sales_id_seq OWNED BY public.sales.id;
          public               OssRezz    false    233            �            1259    16548    transactions    TABLE     Z  CREATE TABLE public.transactions (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    "transactionId" text NOT NULL,
    reference text NOT NULL,
    status public."TransactionStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);
     DROP TABLE public.transactions;
       public         heap r       OssRezz    false    867    4            �            1259    16554    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public               OssRezz    false    4    234            K           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public               OssRezz    false    235            g           2604    16555    customers id    DEFAULT     l   ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);
 ;   ALTER TABLE public.customers ALTER COLUMN id DROP DEFAULT;
       public               OssRezz    false    219    218            h           2604    16557 
   entries id    DEFAULT     h   ALTER TABLE ONLY public.entries ALTER COLUMN id SET DEFAULT nextval('public.entries_id_seq'::regclass);
 9   ALTER TABLE public.entries ALTER COLUMN id DROP DEFAULT;
       public               OssRezz    false    221    220            j           2604    16558    inventories id    DEFAULT     p   ALTER TABLE ONLY public.inventories ALTER COLUMN id SET DEFAULT nextval('public.inventories_id_seq'::regclass);
 =   ALTER TABLE public.inventories ALTER COLUMN id DROP DEFAULT;
       public               OssRezz    false    223    222            l           2604    16559    product_types id    DEFAULT     t   ALTER TABLE ONLY public.product_types ALTER COLUMN id SET DEFAULT nextval('public.product_types_id_seq'::regclass);
 ?   ALTER TABLE public.product_types ALTER COLUMN id DROP DEFAULT;
       public               OssRezz    false    225    224            m           2604    16560    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public               OssRezz    false    227    226            p           2604    16561 
   regions id    DEFAULT     h   ALTER TABLE ONLY public.regions ALTER COLUMN id SET DEFAULT nextval('public.regions_id_seq'::regclass);
 9   ALTER TABLE public.regions ALTER COLUMN id DROP DEFAULT;
       public               OssRezz    false    229    228            q           2604    16562    sale_details id    DEFAULT     r   ALTER TABLE ONLY public.sale_details ALTER COLUMN id SET DEFAULT nextval('public.sale_details_id_seq'::regclass);
 >   ALTER TABLE public.sale_details ALTER COLUMN id DROP DEFAULT;
       public               OssRezz    false    231    230            r           2604    16563    sales id    DEFAULT     d   ALTER TABLE ONLY public.sales ALTER COLUMN id SET DEFAULT nextval('public.sales_id_seq'::regclass);
 7   ALTER TABLE public.sales ALTER COLUMN id DROP DEFAULT;
       public               OssRezz    false    233    232            u           2604    16564    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public               OssRezz    false    235    234            (          0    16493    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public               OssRezz    false    217   6h       )          0    16500 	   customers 
   TABLE DATA           P   COPY public.customers (id, document_number, name, email, cellphone) FROM stdin;
    public               OssRezz    false    218   �k       +          0    16506    entries 
   TABLE DATA           S   COPY public.entries (id, product_id, quantity, created_at, updated_at) FROM stdin;
    public               OssRezz    false    220   m       -          0    16511    inventories 
   TABLE DATA           W   COPY public.inventories (id, product_id, quantity, created_at, updated_at) FROM stdin;
    public               OssRezz    false    222   �m       /          0    16516    product_types 
   TABLE DATA           1   COPY public.product_types (id, name) FROM stdin;
    public               OssRezz    false    224   �n       1          0    16522    products 
   TABLE DATA           �   COPY public.products (id, name, product_type_id, region_id, description, price, image, status, created_at, updated_at) FROM stdin;
    public               OssRezz    false    226   �o       3          0    16530    regions 
   TABLE DATA           +   COPY public.regions (id, name) FROM stdin;
    public               OssRezz    false    228   م       5          0    16536    sale_details 
   TABLE DATA           P   COPY public.sale_details (id, sale_id, product_id, price, quantity) FROM stdin;
    public               OssRezz    false    230   x�       7          0    16540    sales 
   TABLE DATA           j   COPY public.sales (id, transaction_id, address, total_amount, status, created_at, updated_at) FROM stdin;
    public               OssRezz    false    232   ��       9          0    16548    transactions 
   TABLE DATA           s   COPY public.transactions (id, customer_id, "transactionId", reference, status, created_at, updated_at) FROM stdin;
    public               OssRezz    false    234   >�       L           0    0    customers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.customers_id_seq', 12, true);
          public               OssRezz    false    219            M           0    0    entries_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.entries_id_seq', 9, true);
          public               OssRezz    false    221            N           0    0    inventories_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.inventories_id_seq', 20, true);
          public               OssRezz    false    223            O           0    0    product_types_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.product_types_id_seq', 10, true);
          public               OssRezz    false    225            P           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 20, true);
          public               OssRezz    false    227            Q           0    0    regions_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.regions_id_seq', 12, true);
          public               OssRezz    false    229            R           0    0    sale_details_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.sale_details_id_seq', 55, true);
          public               OssRezz    false    231            S           0    0    sales_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.sales_id_seq', 19, true);
          public               OssRezz    false    233            T           0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 27, true);
          public               OssRezz    false    235            x           2606    16566 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public                 OssRezz    false    217            |           2606    16568    customers customers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public                 OssRezz    false    218            ~           2606    16570    entries entries_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.entries DROP CONSTRAINT entries_pkey;
       public                 OssRezz    false    220            �           2606    16572    inventories inventories_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.inventories
    ADD CONSTRAINT inventories_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.inventories DROP CONSTRAINT inventories_pkey;
       public                 OssRezz    false    222            �           2606    16574     product_types product_types_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_types
    ADD CONSTRAINT product_types_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_types DROP CONSTRAINT product_types_pkey;
       public                 OssRezz    false    224            �           2606    16576    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public                 OssRezz    false    226            �           2606    16578    regions regions_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.regions DROP CONSTRAINT regions_pkey;
       public                 OssRezz    false    228            �           2606    16580    sale_details sale_details_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT sale_details_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.sale_details DROP CONSTRAINT sale_details_pkey;
       public                 OssRezz    false    230            �           2606    16582    sales sales_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.sales DROP CONSTRAINT sales_pkey;
       public                 OssRezz    false    232            �           2606    16584    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public                 OssRezz    false    234            y           1259    16585    customers_document_number_key    INDEX     e   CREATE UNIQUE INDEX customers_document_number_key ON public.customers USING btree (document_number);
 1   DROP INDEX public.customers_document_number_key;
       public                 OssRezz    false    218            z           1259    16586    customers_email_key    INDEX     Q   CREATE UNIQUE INDEX customers_email_key ON public.customers USING btree (email);
 '   DROP INDEX public.customers_email_key;
       public                 OssRezz    false    218            �           1259    16587    inventories_product_id_key    INDEX     _   CREATE UNIQUE INDEX inventories_product_id_key ON public.inventories USING btree (product_id);
 .   DROP INDEX public.inventories_product_id_key;
       public                 OssRezz    false    222            �           1259    16588    transactions_transactionId_key    INDEX     k   CREATE UNIQUE INDEX "transactions_transactionId_key" ON public.transactions USING btree ("transactionId");
 4   DROP INDEX public."transactions_transactionId_key";
       public                 OssRezz    false    234            �           2606    16589    entries entries_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.entries DROP CONSTRAINT entries_product_id_fkey;
       public               OssRezz    false    4229    220    226            �           2606    16594 '   inventories inventories_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventories
    ADD CONSTRAINT inventories_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.inventories DROP CONSTRAINT inventories_product_id_fkey;
       public               OssRezz    false    4229    222    226            �           2606    16599 &   products products_product_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.product_types(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 P   ALTER TABLE ONLY public.products DROP CONSTRAINT products_product_type_id_fkey;
       public               OssRezz    false    224    226    4227            �           2606    16604     products products_region_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public.products DROP CONSTRAINT products_region_id_fkey;
       public               OssRezz    false    228    4231    226            �           2606    16609 )   sale_details sale_details_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT sale_details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.sale_details DROP CONSTRAINT sale_details_product_id_fkey;
       public               OssRezz    false    230    226    4229            �           2606    16614 &   sale_details sale_details_sale_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT sale_details_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.sales(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 P   ALTER TABLE ONLY public.sale_details DROP CONSTRAINT sale_details_sale_id_fkey;
       public               OssRezz    false    230    4235    232            �           2606    16619    sales sales_transaction_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.sales DROP CONSTRAINT sales_transaction_id_fkey;
       public               OssRezz    false    4237    232    234            �           2606    16624 *   transactions transactions_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_customer_id_fkey;
       public               OssRezz    false    218    234    4220            (   �  x�}��n#7�;O������}�I�� �d�8��e��:�M�10�F~:�pDx�.F���J'���a����A4!�L#�V��O[ߎ�U�D�`	�V���G�mJt �Z@
�/�'������o ���@E ;���^_�~����>�Û�#�(#�i�JW܅)V����C���Uc�2�X��j}:T�X�b)x��mUABv��u'�������{�^���a��:���y9_���ϗ>���2��FUU^��.^&�x\XuO�v�M\�T8T�iZMt�D��r #b���F�ZѬ�����O�Gp��LH����8�ԉ_%�s�]KeI������2i�]�s.EUC�e��̕>IV���Iw���&Q�����f>t�_�NTOhG�t�����pn��Zw��������Q�� ;�*��Yĸ�ֻ�+�v�v��1�뢵�E�l�=�Ӑ��!��	��9��Y�ܡ[����HO�G5����I��t��4�uj|�ik,�Bӹ��jyW�Wkh�Uk�/Bks�{���VNM'65�і>���l��"�f�O,GK���`,o4���r��z�����ٍ1ã�1W�'ۚ)NݣE�Š�>rl��I��)߻f�i��ǆ%�vI�r �_ι�I���vKӃ�H�(dt�%���8��~�������S�Ų�W�q��
�E�K��pX�#�W;��<g�-s�%���M�la�3u��⚏��⩑�t�?u!t�v��7��$Su�移�?�����|��z��9��5E-���.5}W��6�KΊ��<��#�����4��I�i�S�����g�*��R��j�cԅ��Rd_��|B:�d�+*��N�}�[�~/7�.��ۯ�*�h/d_�777� &��_      )   $  x���Mn�0��ϧ�	�����	�BU%P��Ix�&r�^�[.VG���BgcY��f����$J`϶�|4��V=�F޿fM�C�_�vU��T�D#��Js_�#�}Br%���F�a����p
P�8I�60�f���飍V��?%�2:�8��2�"ؐB�oη�/q��$��	[�_�����0��q�<�UhbN�ڋ��FCr�ӧ�t~t�K�S�+��K��U�Ċ!�^l�l4h�[Xl|5�����t�	�P ��Z�e��f]�K��:4��Js{�1ƾ ?ޮt      +   �   x�u��!��3T1�!�Z��_Ǻ�ɞ�����FH2���o���\��Sg#��������D�S�����C����v)��{;����C����R�+f���I���΃0k��V\��<��pc�J�<u~��?Z�[a      -   -  x�u�Ar!�5��/0AԳ��爓��L$U�~��:)�Z<����jc�d����2[KSƜj�X�Ж�.f�;�^𵗆Xc#Qw���t?�n3x�*T��ɬ�OpP�,^0�]�q�Q����_[Jr�,�A�q��{��A��0W�����<��x��,E�`�yQh��*M2f���Z0@�����EA뢙#���ya�۞;k�� o��#~������~�'x�<��1�;g!j��8��3:�U��w~���I�>�R�3��FCt�~�I�5L�f��lOR�=H��?^���0�;U{ʩ      /   �   x�E�=�0F���Q�Y�5X��E�\�$)Hܦ#���RP7�}����}|+dus�6B�lsk��!Ό�e����'����:�pȄ����K'�1�:����U��v�rd�w�G˿���?�)=�JZ	H�R%���
�u����'\W �ĴN�      1      x��[�r�ƒ]S_Q^LĽ6� ��R����ö:���(� �. �-�����;?г�EOĄg�K�O�%s2��;�;Z�*O�<�Y=]���G��.ԏ:ߘ�sV)벭)�{-&[7JF��e���o�����X]���T�ژ� �Tu�Uir����W�&�t�~��ʊ4��Jk]9�J�v��Hy��ͳ�����uzgK|����>�i����({�Lj���w���T��֩��"K-�ϙ���j�k��2�𩬲6>Uv�y
e�۷<g��w"�����,+�ۃ�f���1^����_�y�ϭ�/��wƕ��^�Sy�4j��R���v��ta�1-a�U��c����C�g�����,J���"^X�TV��`5u�m�ۚ��F=X��wvS�����4�&�`2���yG�h9M�x|���E�(y6��ME�d�
'�l�l��NW�b�$A8��EB�f��<9	�n��.�Bե����o���>s�*�6j�X�H��ԷF���2Klr�����ܙL�q�&��uN�U�-�r���^P��R��v������Fc�UU�J?�Ly�V�)�;�Ū �.6�6y�[�x�$�Uxi����ë���N�S��]����NuQ��	֘\��h:��V[$�Y�x�j�E�X��V����`�Dg�7
���1YA[�ͯ��Ç�؁7�Wᄭ��?~��@����۽8�	oY�x�h�0�\��+r[�a�(���D���>:P�9�IHmAlO����еL�����:����\׼�Φ��Ƕ�d��^<���`��Xc�#f���t�YO� 7����=8͸;M�"��W�ٝ>� `B]�r{Ѽ��KR���>��5�ϳ����~�;��HLA0�m1[��ܑ->輢I��gx3h9';9��s��(	�>���y��	�MW 0�8:�_�B��49=�Z�'sVp[��:B�Mn�ln��n���������,�3����)��06μO�	���e߫}]Tu���~�[u�0>���&�V�M�(k�b�Cض0`�@��w�cR��F�I�в;|`��(�}�^��1�{��s�� @��S[B/�T���õ�u��OX��b�%6�<n���!41�
�H�6��2���w�4�֡�����Xcu�eY`��P����S`+6mr-M)@ƪs�[�$�՝�V<z���%=|�M�=�x�?�S@�)���CH�)m�����E��v� O�U�XJ�v���`�69���>���U�(&�d}C�qM���<=�hq�;딖-˱T<0��E4]Bk.�"�?�<9C�9�4�11[>+�-�\��o0�&�E܏7q4������{<YE�`:��ͼ#"�	��&��hX�Ao��#Y��>| 9������ׇ�P�~8��ŷ��a+�h",�xs��������N|L��A�d��$X��o`�q��!��m�[���V꽌_��K�,�|cx��Xc��g�j�ߑ��y��O�w�-�(���w�ְ�`���E�ɐ��$	秤 X}�
�A.�Y=ZM� �O��A�Ѻ28��	�N���p2j�Ï|����ghI;��.���{;��h���|���������z�O_~+��ç�/3r�+��l���5�9��x��%�n�M9�%�f�c������1���4�Dt�3h��@F�����J=w�Ad��	����l�vu��7L�Wz���
>�!2�@\���̝~m�nM��坹q���gG�C�_,�C(DQO�PC�B��P��GA<����%���m`"fL,(�d�� �I4ot/���uV��`�� ��b[�r�b�+��S	�O�rSH���P�ƞ�{Q����zOvg
.��Gt��p��a|��o��hd]��D�]%�R;�����9�k2�^��xE������>��<|�Sa/�#,'�٩�Va̖�ya��� r�-=Zq��k󍒬b;�A��j���Y�L�}�e��o_�P�Β�Q���6]В4��8��[�B�RP&�&�N���-*�u{�6��$ pR��}v�9bM�l��P��\/*b�F��͚�IY�;�����3�{�р4���3"KeGo'3	�"�Rl���:�:�OT8(a�f�|���d��}�N�[�.Br �(wz��)�*X�t�َ�J/�≺�^�t���ht��^0������4�'��~{
�qr�Cv�
�A���!2�ɨ��<w��m�	y]T]�	��bK�(��ݾ\�d�+��L%�Mv�F�RW�10i�R�Z��krE?>���j�2��ۼ����'`E
A%˸}Nz�!M~�����E$��r��@`6P�%�@���nKV���{���v�������ua�6+xSr�5�aV\������AZ�~8e6��}R��ۋ�0�2vR����l��P��1��b�M�?�\�W��K2��<"�X���n�0�
��1�O	D �TՁ�������!�\K�������μ���j���O"՚�ג���;���@�{+b����.���<�]F�$ ��mTm��+5	sб�QH��RF����XYl>P�Τ")����
�t�s��W�� �}ε�Ҍ6�0�1m%�����_����hv�`�0��頵���䑂�!na�8������5H칳B1���Q�e�?��7G�D�87���u�lS���Nj\7@/�z���
�4E������X��ĝ$y����J��g$��"���=�W/�0�d>�B1������m��X�v� uHo���A<�%�_q������L�9�� _�k������o*&P�A 4�iS��2�Dߵ55B��p�/�c���(��<�ͧĔ�D� ��gat\���eV
!���ӭ�����NV��'��s�^��_j��D��r#�	*��Po�F�c0���9��8!{��D���6Xr_M��w�#un.���u틙C1�J����ڬE�T���&�iK�y�ʃ�Kٛb��1(7#3Ur�є_��E4({O�t=JK�j�9_!aI&�c���I|NO�%mg�_�S*���tW�\��9	�������x����I��8��V(ڥ��P�z[�T:%��^�~���{���N~8q�a�d3�mӚ�����ԐM��}�[�o�W��W^��+K%G.\�+l�u�I���}�F��Qs��4e�t�	���A�x�Ю��V��.�ߝ����o��N^�2���ޖ�Tf(�LG\�5�#C�_pP�5�f���L�zT�b�W�p�� ����;�%Cd/�8�ώ��R���$�ȵX#;Y�qC��@g�3fr}m`�zK�|��Ç}Y�$"^�ag����˹�w��nkx��k$
T�� S�8~�'i�B���7�8l��-��n4��]>�e����S�q���p�T����2���D��R�I���s]�3��)�n���{����,�*��'n
{���������2~l��?~�/ZW�����Dg
�޶%��;��ג]W"ˆ�$�	.�A�����BM�GI�_TB9M�נ�ƕ%W��2�u��jE�N�卑��9,�(�)\x?n�N=???�-'�LOMTĤ���:�)9�6.�&1܋�N�%{��o)�r�{g��Ҥ���֎��D�-��6�i{�J��P��%�靖Ӫk�ۖ�'���ۃ�.�����5+���'
��!�̋�=`IX�J����;*Skm�WMy��R� E���#�(�F�9�ցl���G�X�\7���+�F��Fӌ\�@�b<_c`A�A�����E��v.R��=�uU���fl�K�ؗ��u!��3�.ٻ&'��v�5W��G�=0��t��M�3J���wPy�N�8#rB,!=�W��'�4O����b�s��˿��Kd�}{<��7o�B�ȋJ�a������(tE4�������<h^����%h�yl! ���"��y/#�����kd#�;�b�1)S�Zs����]����X�<K�(��U�ABl 1  )R�RF�,>J�&a��'K>P��<H�J>�^.��0>Q�Ls�&{/��U��Q2zC��k#/��=������҅�Ҫ�N���;�c��'Nx�0�%��pI�SY�h�j�ڑ��TZ&�ʺV��]�ډLd1^Q����k#��n�8�ʜ��J��������rx@��R��ˤ�C8&ڤd�(�= �۳�����.V�t���U|p���E�m|�L�>������}�=.�Yx�l(E�N���X��({�ѹ��\�i:�����)�z[�u�@T��҃�zN[ip���X�h,|ie�VU�4Yy#���q���s�og� ם�BT������L��o����?���Ƅ��hH�A��ΙT�jW��w@�Ë�TW����+]��V �|�*Y#�U�[��C>5�p�?2C��7�����;�E<Y.��c����Z��z�����f�6���-�qP�lT$�|';�F���'�ǓG���Ow�I{��.!���5�^��5���Կ�YPݢj(��H���ќ�q^C%�A/��%��hB�I�N�>�[?��6W�l�I�ZH��ߠ�1�^]@�����`:<��m�LeSS�6C���2>�H�=-6u��δ�/�l��"(�����K��{��ht�
�����<B���lɾNo2` 4!q͢Gg:��d͂h=u�,����\3�so4G�|t���~�;C��V!r_�U�y��!�	�EK)���{酐hCMs��Ƹ5����^�s�Sp=��k�ݐ�ä?�独���W`�STc�>��E�V�}w&�k�����Â"<�VN�r#��5�x��ʚ�Ǿ���[�E��!uǻ�Tt�
֎q�I?�k�>}v�ɉ�kG�,:BN�g�S�IA���ga���2�E"�ݺN��R%��F?㾌
C�u��>Pm֝�(�Ϙ�����\7�pf'�k�R���$�[[�`h����ͩ�ڝ��p�5E�n�7���qn�z#H^�����WdM��Gޥj콺h�Du R:�����B�s�{՝�8|�X˕�m8��Z!>]�C�W�g���.����l	�Q/t���k�B"��#D�Z!Q�� ��X��~$�R����3�~�B�/G�APM�Ә	WS�G�����1׼�R^j;�`��!���d����;��7�ޒ&��A[bF�QH����fm�F�v"�NA�ד�k�x�}r���M�f;�;ʔ�#����7�B�J1}�0^j����o 5�]�L��L�H�5;}O	�d�˞�,��i����a�wmܮ�N�e���	�'_���Ը!��#eO�8T� zF][��>�ć!���<��jw͡���c����O[�x*#@-S6��8�F�E��c F�,��S�Ϣ���\��o��g��h�ď���7Bb�h�ۜ�W4��s���W�r�;oY��w�^O���t9�QSp��Яt!�ǳ��C2PTD������A)_Yө/�(�;�Sя%���@����5�D`x>i:M���4Y.g�Q��Z��|��k�������4��2      3   �   x�%�;�0E�zf^��_�44D� *�'�b$�V&6��`�	�WG�R��0pEW�s��.E�߉�t�YR_��[
ҁ�t*��i.O������#o��ovIu�N":�ܖZČ輲���
�����Ԝ��X0��+3/      5     x�]�K��0Dѱ��˖{�����8�ۥ̸�2��-�+~�Z�Kk��󆰦	�k��,�l�$ �WWӊ�I����/�e�N�Fn�<�*�ıV�ն��c��ߢ^Z5�BJͶ���n[BP��Ұ��	J��p۳�b��i�4m�۳�b���NK-��rIny��e��۴���Js5��׾�A�/���>�$/?�`C&k%�=ߖآ�'�b�����)F8���ᴭ�h����'1��i[�ֳ[��AK���)���w�      7   �  x���Kn�0��3��mM̃/q�8��c�e6����{�����@���Xv[B�O�7�sn`9��cǢݻ����.6_6�� %����w���.AH҂�JGԴo���8�?V�&��0{�?T����q�/>�������I���X=��lq��F(g�c�KqiR�d�8�����4n�0�9o��%h�������`�>.�<k�-q����̱�p���Ȗ�&�4�Ǒ	����M$e�����Θi�qd���iW��ͷSf�Zn-a�N�z�����uܞp��s,<{w�&9�n1�a������j����p�H��ڌ��DZJvJB��hQ4�r��q��q�6�|��j�8Z%�j���ظ6�S�8Z%Å)inki�sa��eO��cY��Ӯ)Zx��WIǇ��� ��y%      9   �  x�}�ˎ��������$2�Lc0��F/��l$��0�8��夒8�*�}��'���3�&��Q�J�D��������d7�H�%�����E�?�m��7�*����������B�Y��M���B<גO�2S�I�Y4Sb˥~��P.�=U��,#����X�/��۸�Z%�w,r��؉=f�I�Q�j�E>Q�ٛ��T��d뺦�N��Ȓsa����E/Rg���\���d/,H�gq�dq�&k�HL��Z�bkr2%W��wߜ���]8��rjW�)?��T����兛�4��&ʩY�T©o��n��[�}\�Ec���O�ŋ3���O[��[xꫣt{�R[�HҔF۬��o�A��?~����=*��l*'����T�a��ę�0�dy��ۂ�1f5M���Y��/S��A6tf�;"Sd�G'LD�S�y����؆�<���(�R�ݗ��L���޽���w�E��	�-,e%;�:Jq�rv���"����FF��~�UH�9�^�/�g����g�����_0{�,-��G�P!]�yZ�6p�Q���ҿ�H��ī]�,�'�'��(��z��l��d{g���GܝTǪ5�}��Y��7�O���4`y_c+P<$�_�������l�^o*ieZy]�J�Qp��{�^��P˳ݮ���'}�1����Aɭ�48��g6v�ul���W�5oiꞧ�i��Q4�&t?�x��)협��5�h�0(���Qe�ҳ�&7_	�gi��jraC�{E�����&IB��պ4EGA�+�d��xI��������q���Ui{�h�#MQf�ME���,mi-v�Y@�VK�DҢ��z^��_|Y�*�N��6{�Cj|��B���U?i���օP�c�׽��Cu �����������\�̪�j�������!6Z�N�}g�����0�J�`���"]�_hLf�3�Yb�x�)d��B�>a���@�SA�|��^2>lɼe����9��0�ADP>|�W�ϥ�	I~��k�]��1]*F����"ޛ��bv�bZ�e�ͷ������_�Λ�����TC��@ώDQ�>a�.�$�ՠ;x5�X���ĸ�J���S�w�:��b7�)����հ%���I>��D$��R@pS�2h�r��W0��y�~�o���8���$������� Y�~�\�R��2[GS��ɵp�66Ae�� �}3�iq쳑�<6����0ń������ 5ꑬLŇRٷrtՂ�Bk}`���6�}�����py���2vS�$?�0!�����ջ�H2tMJ��{��J�U)_|�e|���Og�u��
��1�u)���%�C��hԲA����4���.cYp��]
��/���d��\O�hq�	#�)2*�;��������p����n��h��?4G����ôo1�:$�d=����L���i�?e�BK     