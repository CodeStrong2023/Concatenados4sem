package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

@Component
public class LibroFrom extends JFrame {
    LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JTextField idTexto;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JButton agregarButton;
    private JButton modificarButton;
    private JButton eliminarButton;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroFrom(LibroServicio libroServicio){
        this.libroServicio = libroServicio;
        iniciarForm();
        agregarButton.addActionListener(e -> agregarLibro());
        tablaLibros.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                super.mouseClicked(e);
                cargarLibroSeleccionado();
            }
        });
        modificarButton.addActionListener(e -> modificarLibro()); // Expresión lambda
        eliminarButton.addActionListener(e -> eliminarLibro());
    }

    private void iniciarForm(){
        setContentPane(panel);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
        setSize(900, 700);
        setLocationRelativeTo(null);
    }

    private void agregarLibro(){
        // Validar campos vacíos
        if (validarCamposVacios()) return;


        // Si hay una fila seleccionada, impide agregar un libro
        var renglon = tablaLibros.getSelectedRow();
        if (renglon != -1) {
            mostrarMensaje("El libro ya existe");
            tablaLibros.clearSelection();
            limpiarFormulario();
            return;
        }

        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        var precio = Double.parseDouble(precioTexto.getText());
        var existencias = Integer.parseInt(existenciasTexto.getText());
        // Creamos el  objeto libro
        // Pasamos el id en null para hacer un insert
        var libro = new Libro(null, nombreLibro, autor, precio, existencias);
        // Esta es una forma alternativa de trabajarlo
        //libro.setNombreLibro(nombreLibro);
        //libro.setAutor(autor);
        //libro.setPrecio(precio);
        //libro.setExistencias(existencias);
        this.libroServicio.guardarLibro(libro);
        mostrarMensaje("Se agregó el libro...");
        limpiarFormulario();
        listarLibros();
    }

    private boolean validarCamposVacios() {
        if (libroTexto.getText().isEmpty()) {
            mostrarMensaje("Ingresa nombre del libro");
            libroTexto.requestFocusInWindow();
            return true;
        }
        if (autorTexto.getText().isEmpty()) {
            mostrarMensaje("Ingresa nombre del Autor");
            autorTexto.requestFocusInWindow();
            return true;
        }
        if (precioTexto.getText().isEmpty()) {
            mostrarMensaje("Ingresa precio del libro");
            precioTexto.requestFocusInWindow();
            return true;
        }
        if (existenciasTexto.getText().isEmpty()) {
            mostrarMensaje("Ingresa existencias del libro");
            existenciasTexto.requestFocusInWindow();
            return true;
        }
        return false;
    }

    private void cargarLibroSeleccionado() {
        // Los indices de las columnas inician en 0
        var renglon = tablaLibros.getSelectedRow();
        if(renglon != -1){
            String idLibro = tablaLibros.getModel().getValueAt(renglon, 0).toString();
            idTexto.setText(idLibro);
            String nombreLibro = tablaLibros.getModel().getValueAt(renglon, 1).toString();
            libroTexto.setText(nombreLibro);
            String autor = tablaLibros.getModel().getValueAt(renglon, 2).toString();
            autorTexto.setText(autor);
            String precio = tablaLibros.getModel().getValueAt(renglon, 3).toString();
            precioTexto.setText(precio);
            String existencias = tablaLibros.getModel().getValueAt(renglon, 4).toString();
            existenciasTexto.setText(existencias);
        }
    }

    private void modificarLibro() {
        if (this.idTexto.equals("")){
            mostrarMensaje("Debes seleccionar un registro en la tabla");
        }
        else {
            // verificamos que nombre del libro no sea nulo
            if(libroTexto.getText().equals("")){
                mostrarMensaje("Debes seleccionar un registro en la tabla");
            }
            else {
                // verificamos que nombre del libro no sea nulo
                if (libroTexto.getText().equals("")){
                    mostrarMensaje("Digite el nombre del libro...");
                    libroTexto.requestFocusInWindow();
                    return;
                }
                // Lllenamos el objeto libro a actualizar
                int idLibro = Integer.parseInt(idTexto.getText());
                var nombreLibro = libroTexto.getText();
                var autor = autorTexto.getText();
                var precio = Double.parseDouble(precioTexto.getText());
                var existencias = Integer.parseInt(existenciasTexto.getText());
                var libro = new Libro(idLibro, nombreLibro, autor, precio, existencias);
                libroServicio.guardarLibro(libro);
                mostrarMensaje("Se modificó el libro...");
                limpiarFormulario();
                listarLibros();
            }
        }
    }

    private void eliminarLibro() {
        var renglon = tablaLibros.getSelectedRow();
        if (renglon != -1) {
            String idLibro = tablaLibros.getModel().getValueAt(renglon, 0).toString();
            var libro = new Libro();
            libro.setIdLibro(Integer.parseInt(idLibro));
            libroServicio.eliminarLibro(libro);
            mostrarMensaje("Libro " + idLibro + " ELIMINADO");
            limpiarFormulario();
            listarLibros();
        }
        else {
            mostrarMensaje("No se ha seleccionado ningún libro de la tabla a eliminar");
        }
    }

    private void limpiarFormulario(){
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
    }

    private void mostrarMensaje(String mensaje){
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void createUIComponents() {
        idTexto = new JTextField("");
        idTexto.setVisible(false);
        this.tablaModeloLibros = new DefaultTableModel(0, 5){
            @Override
            public boolean isCellEditable(int row, int column){
                return false;
            }
        };
        String[] cabecera = {"Id", "Libro", "Autor", "Precio", "Existencias"};
        this.tablaModeloLibros.setColumnIdentifiers(cabecera);
        // Instanciar el objeto JTable
        this.tablaLibros = new JTable(tablaModeloLibros);
        // Evita que se seleccionen varios registros
        tablaLibros.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        listarLibros();
    }

    private void listarLibros() {
        // Limpiar la tabla
        tablaModeloLibros.setRowCount(0);
        // Obtener los libros de la base de datos
        var libros = libroServicio.listarLibros();
        // Iterar los libros
        libros.forEach((libro) -> { // Función Lambda
            // Creamos cada registro para agregarlos a la tabla
            Object [] renglonLibro = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias()
            };
            this.tablaModeloLibros.addRow(renglonLibro);
        });
    }

    private void configurarLayout() {
        panel = new JPanel();
        GroupLayout layout = new GroupLayout(panel);
        panel.setLayout(layout);
        layout.setAutoCreateGaps(true);
        layout.setAutoCreateContainerGaps(true);

        layout.setHorizontalGroup(
                layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
                                .addComponent(libroTexto)
                                .addComponent(autorTexto)
                                .addComponent(precioTexto)
                                .addComponent(existenciasTexto)
                                .addComponent(agregarButton)
                        )
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
                                .addComponent(tablaLibros)
                                .addComponent(modificarButton)
                                .addComponent(eliminarButton)
                        )
        );

        layout.setVerticalGroup(
                layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                                .addComponent(libroTexto)
                                .addComponent(tablaLibros)
                        )
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                                .addComponent(autorTexto)
                        )
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                                .addComponent(precioTexto)
                        )
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                                .addComponent(existenciasTexto)
                        )
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                                .addComponent(agregarButton)
                                .addComponent(modificarButton)
                                .addComponent(eliminarButton)
                        )
        );
    }
}
